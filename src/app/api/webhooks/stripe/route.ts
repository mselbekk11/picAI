// This route handles incoming webhook events sent from Stripe.
// It's triggered by Stripe when there are updates to a customer's subscription (created or updated).
// The events are processed to update subscription details in the application's database using Supabase.
// Each webhook request is validated for authenticity by verifying the signature using a secret key.

import config from '@/config';
import { EnumSubscriptionBillingCycle } from '@/types/types';
import { supabaseAdmin } from '@/utils/supabase/admin';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Environment variables for Stripe API key and webhook secret.
const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

// Stripe object initialization with TypeScript support enabled
const stripe = new Stripe(SECRET_KEY!, {
  typescript: true,
});

// Main function to handle POST requests from Stripe webhooks
export async function POST(req: NextRequest): Promise<NextResponse> {
  // Retrieving the signature from the headers to validate the request
  const signature = headers().get('stripe-signature') as string;
  const requestData = await req.text();

  try {
    // Validate and construct the event using Stripe's library
    const event = stripe.webhooks.constructEvent(requestData, signature, WEBHOOK_SECRET!);
    const {
      type: eventType,
      data: { object: eventObject },
    } = event;

    console.log(`Event received: ${eventType}`);

    // Retrieve the full subscription object from Stripe
    const subscription = await stripe.subscriptions.retrieve((eventObject as Stripe.Subscription).id);

    // Handle the event based on its type (e.g., subscription creation or update)
    switch (eventType) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(subscription);
        break;
      case 'customer.subscription.updated':
      case 'invoice.paid':
      case 'invoice.payment_succeeded':
        await handleSubscriptionUpdated(subscription);
        break;
    }

    // Successful handling of the webhook event
    return NextResponse.json({ message: `Processing webhook for ${eventType}` }, { status: 200 });
  } catch (err: any) {
    console.error(err.message);
    // Error handling if there is an issue processing the webhook
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

// Handles 'customer.subscription.created' event: Activates a subscription and updates the database.
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const {
    id: subscriptionId,
    status,
    start_date,
    items: { data: subscriptionItems },
    customer: customerId,
  } = subscription;

  console.log(`[Subscription Created] Activating subscription`);

  try {
    // Extract relevant details from the subscription object
    const { interval, amount, product } = subscriptionItems[0].plan;

    const subscriptionType = config.stripe.plan[product as keyof typeof config.stripe.plan];
    // Converting unix time to ISO format (multiply 1000 to convert it from sec to ms).
    const startDate = new Date(start_date * 1000).toISOString();

    // Retrieve customer details from Stripe
    const customer = await stripe.customers.retrieve(customerId as string);
    const email = (customer as Stripe.Customer).email;

    const { error } = await supabaseAdmin
      .from('subscriptions')
      .update({
        subscription_id: subscriptionId,
        interval: interval as EnumSubscriptionBillingCycle,
        type: subscriptionType as 'standard' | 'premium' | 'free',
        start_date: startDate,
        amount,
        active: status === 'active',
      })
      .eq('user_email', email!);

    if (error) {
      console.error(error);
      throw new Error(`Updating subscription details subscription id: ${subscriptionId}, user: ${email}`);
    }

    console.debug(`Subscription created for user: ${email}`);
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

// Handles 'customer.subscription.updated' event: Updates the status of a subscription in the database.
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const { id: subscriptionId, status, customer: customerId } = subscription;

  console.log(`[Subscription Updated] Updating subscription ${subscriptionId}`);

  try {
    // Retrieve customer details from Stripe
    const customer = await stripe.customers.retrieve(customerId as string);
    const email = (customer as Stripe.Customer).email;

    // Check if the subscription exists in the database
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .select('id, user_id')
      .eq('subscription_id', subscriptionId)
      .single();

    if (error && error.code === 'PGRST116') {
      // Subscription not found, create a new one
      console.log(`Subscription not found, creating new subscription for ${email}`);

      // First, try to find the user_id based on the email
      const { data: userData, error: userError } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', email ?? '')
        .single();

      if (userError) {
        console.error(userError);
        throw new Error(`Error finding user with email: ${email}`);
      }

      const { error: insertError } = await supabaseAdmin.from('subscriptions').insert({
        subscription_id: subscriptionId,
        user_email: email!,
        user_id: userData.id, // Use the user_id from the users table
        active: status === 'active',
        type: 'standard', // Set a default type, adjust as needed
      });

      if (insertError) {
        console.error(insertError);
        throw new Error(`Creating new subscription for id: ${subscriptionId}`);
      }
    } else if (error) {
      console.error(error);
      throw new Error(`Error checking subscription in database for id: ${subscriptionId}`);
    } else {
      // Update the existing subscription
      const { error: updateError } = await supabaseAdmin
        .from('subscriptions')
        .update({ active: status === 'active' })
        .eq('subscription_id', subscriptionId);

      if (updateError) {
        console.error(updateError);
        throw new Error(`Updating subscription details for subscription id: ${subscriptionId}`);
      }
    }

    console.debug(`Subscription updated for id: ${subscriptionId}`);
  } catch (error: any) {
    console.error(error);
    throw new Error(`${error.message}`);
  }
}
