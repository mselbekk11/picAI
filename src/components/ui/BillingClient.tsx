'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCredits } from '@/context/CreditsContext';

interface Subscription {
  type: 'free' | 'standard' | 'premium';
  amount: number | null;
  interval: 'month' | 'year' | null;
  start_date: string | null;
}

interface BillingClientProps {
  subscription: Subscription | null;
}

// Helper function to format date consistently
// function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   return date.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
// }

export default function BillingClient({ subscription }: BillingClientProps) {
  const { modelCredits, imageCredits } = useCredits();

  return (
    <div className=''>
      <Card className='grid grid-cols-1 lg:grid-cols-2'>
        <CardContent className='p-6'>
          <div className='flex flex-col'>
            <div className='mb-4'>
              <p className='text-xs'>Current Subscription: </p>
              <p className='text-lg font-medium'>
                {subscription
                  ? `${subscription.type} plan - ${
                      subscription.amount !== null
                        ? `$${(subscription.amount / 100).toFixed(2)}/${subscription.interval}`
                        : 'Amount not available'
                    }`
                  : 'Free Plan'}
              </p>
              {/* {subscription && subscription.start_date && (
                <p className='text-xs text-slate-500'>Start Date: {formatDate(subscription.start_date)}</p>
              )} */}
            </div>
            <div className='mb-4'>
              <p className='text-xs'>Model Credits:</p>
              <p className='text-lg font-medium'>{modelCredits}</p>
            </div>
            <div className='mb-4'>
              <p className='text-xs'>Image Credits:</p>
              <p className='text-lg font-medium'>{imageCredits}</p>
            </div>
          </div>
        </CardContent>
        <CardContent className='p-6'>
          <div className='flex items-center justify-end gap-2'>
            <Button variant='default' size='sm' className='ml-4'>
              Upgrade Plan
            </Button>
            <Button variant='outline' size='sm'>
              Manage Subscription
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className='mx-auto w-full'></div>
    </div>
  );
}
