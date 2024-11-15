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
  const signature = (await headers()).get('stripe-signature') as string;
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
        // Skip if this is the initial "updated" event that comes with creation
        // The creation event happens within seconds of the subscription being created
        if (Math.abs(subscription.created - Date.now() * 0.001) > 60) {
          await handleSubscriptionUpdated(subscription, eventType);
        }
        break;
      case 'invoice.paid':
      case 'invoice.payment_succeeded':
        await handleSubscriptionUpdated(subscription, eventType);
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
    current_period_start,
    items: { data: subscriptionItems },
    customer: customerId,
  } = subscription;

  console.log(`[Subscription Created] Activating subscription`);

  try {
    // Extract relevant details from the subscription object
    const { recurring, unit_amount, product } = subscriptionItems[0].price;
    const interval = recurring?.interval;

    const subscriptionType = config.stripe.plan[product as keyof typeof config.stripe.plan] || 'standard';
    // Converting unix time to ISO format
    const startDate = new Date(current_period_start * 1000).toISOString();

    // Retrieve customer details from Stripe
    const customer = await stripe.customers.retrieve(customerId as string);
    const email = (customer as Stripe.Customer).email;

    // Get user_id from database first
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email ?? '')
      .single();

    if (userError) {
      console.error(userError);
      throw new Error(`Error finding user with email: ${email}`);
    }

    const { error } = await supabaseAdmin
      .from('subscriptions')
      .update({
        subscription_id: subscriptionId,
        interval: interval as EnumSubscriptionBillingCycle,
        type: subscriptionType as 'free' | 'standard' | 'premium',
        start_date: startDate,
        amount: unit_amount,
        active: status === 'active',
      })
      .eq('user_email', email!);

    if (error) {
      console.error(error);
      throw new Error(`Updating subscription details subscription id: ${subscriptionId}, user: ${email}`);
    }

    console.debug(`Subscription created for user: ${email}`);

    // Define credit amounts based on plan and interval
    const creditAmounts = {
      standard: {
        month: { model: 1, image: 80 },
        year: { model: 12, image: 960 },
      },
      premium: {
        month: { model: 3, image: 300 },
        year: { model: 36, image: 3600 },
      },
    };

    const credits =
      creditAmounts[subscriptionType as keyof typeof creditAmounts][interval as 'month' | 'year'];

    // Now use userData.id for the credits insertion
    const { error: creditError } = await supabaseAdmin.from('user_credits').upsert({
      user_id: userData.id,
      model_credits: credits.model,
      image_credits: credits.image,
      last_reset_date: new Date().toISOString(),
    });

    if (creditError) {
      console.error(creditError);
      throw new Error(`Error adding initial credits for user: ${userData.id}`);
    }

    console.log(`
      Initial credits added for user ${userData.id}: ${credits.model} model credits and ${credits.image} image credits
      `);
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

// Handles 'customer.subscription.updated' event: Updates the status of a subscription in the database.
async function handleSubscriptionUpdated(subscription: Stripe.Subscription, eventType: string) {
  const { id: subscriptionId, status, customer: customerId, current_period_start, items } = subscription;

  console.log(`[Subscription Updated] Updating subscription ${subscriptionId}`);

  try {
    // Retrieve customer details from Stripe
    const customer = await stripe.customers.retrieve(customerId as string);
    const email = (customer as Stripe.Customer).email;

    // First, try to find any existing subscription for this user
    const { data: existingSubscription, error: existingError } = await supabaseAdmin
      .from('subscriptions')
      .select('id, user_id')
      .eq('user_email', email ?? '')
      .single();

    const subscriptionItem = items.data[0];
    const amount = subscriptionItem.price.unit_amount;
    const interval = subscriptionItem.price.recurring?.interval;
    const startDate = new Date(current_period_start * 1000).toISOString();
    const product = subscriptionItem.price.product as string;
    const subscriptionType = config.stripe.plan[product as keyof typeof config.stripe.plan] || 'standard';

    if (existingSubscription) {
      // Update the existing subscription
      const { error: updateError } = await supabaseAdmin
        .from('subscriptions')
        .update({
          subscription_id: subscriptionId, // Update with new subscription ID
          active: status === 'active',
          amount: amount,
          interval: interval as EnumSubscriptionBillingCycle,
          start_date: startDate,
          type: subscriptionType as 'free' | 'standard' | 'premium',
        })
        .eq('id', existingSubscription.id);

      if (updateError) {
        console.error(updateError);
        throw new Error(`Updating subscription details for user: ${email}`);
      }

      // Update credit amounts to account for billing interval
      const creditAmounts = {
        standard: {
          month: { model: 1, image: 80 },
          year: { model: 12, image: 960 },
        },
        premium: {
          month: { model: 3, image: 300 },
          year: { model: 36, image: 3600 },
        },
      };

      const credits =
        creditAmounts[subscriptionType as keyof typeof creditAmounts][interval as 'month' | 'year'];

      if (
        eventType === 'customer.subscription.updated' ||
        eventType === 'invoice.paid' ||
        eventType === 'invoice.payment_succeeded'
      ) {
        console.log(
          `Adding ${credits.model} model credits and ${credits.image} image credits for ${interval}ly subscription`
        );

        // Add the new credits using RPC functions
        const { error: modelCreditError } = await supabaseAdmin.rpc('add_model_credits', {
          user_id: existingSubscription.user_id,
          amount: credits.model,
        });

        if (modelCreditError) {
          console.error(modelCreditError);
          throw new Error(`Error adding model credits for user: ${existingSubscription.user_id}`);
        }

        const { error: imageCreditError } = await supabaseAdmin.rpc('add_image_credits', {
          user_id: existingSubscription.user_id,
          amount: credits.image,
        });

        if (imageCreditError) {
          console.error(imageCreditError);
          throw new Error(`Error adding image credits for user: ${existingSubscription.user_id}`);
        }

        // Update the last reset date
        const { error: resetDateError } = await supabaseAdmin
          .from('user_credits')
          .update({
            last_reset_date: new Date().toISOString(),
          })
          .eq('user_id', existingSubscription.user_id);

        if (resetDateError) {
          console.error(resetDateError);
          throw new Error(`Error updating reset date for user: ${existingSubscription.user_id}`);
        }

        console.log(`
          Credits added for user ${existingSubscription.user_id} on ${eventType} (${interval}ly plan)
          `);
      }
    } else {
      // If no subscription exists for this user, create a new one
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
        user_id: userData.id,
        user_email: email!,
        interval: interval as EnumSubscriptionBillingCycle,
        type: subscriptionType as 'free' | 'standard' | 'premium',
        start_date: startDate,
        amount: amount,
        active: status === 'active',
      });

      if (insertError) {
        console.error(insertError);
        throw new Error(`Creating new subscription for user: ${email}`);
      }
    }

    console.debug(`Subscription updated for user: ${email}`);
  } catch (error: any) {
    console.error(error);
    throw new Error(`${error.message}`);
  }
}
