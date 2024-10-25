import PricingThree from '@/components/PricingThree';
import BillingClient from '@/components/ui/BillingClient';
import { supabaseServerClient } from '@/utils/supabase/server';

async function getSubscription(userId: string) {
  const supabase = supabaseServerClient();
  const { data, error } = await supabase
    .from('subscriptions')
    .select('type, amount, interval, start_date')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }

  if (data.length === 0) {
    console.log('No subscriptions found for user:', userId);
    return null;
  }

  console.log('Fetched subscription data:', data); // Log the fetched data for debugging
  return data;
}

export default async function BillingPage() {
  const supabase = supabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error('Error fetching user:', userError);
    return <div>Error loading user data</div>;
  }

  const subscriptions = user ? await getSubscription(user.id) : null;
  // Pass the first subscription if it exists, otherwise null
  const subscription = subscriptions && subscriptions.length > 0 ? subscriptions[0] : null;

  return (
    <div className='flex flex-col p-6'>
      <BillingClient subscription={subscription} />
      <PricingThree />
    </div>
  );
}
