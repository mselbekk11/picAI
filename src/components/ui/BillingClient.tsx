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
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default function BillingClient({ subscription }: BillingClientProps) {
  const { modelCredits, imageCredits } = useCredits();

  const customerPortalLink = 'https://billing.stripe.com/p/login/test_5kAbJFfd02YTdQQbII';

  return (
    <div className=''>
      <Card className='grid grid-cols-1 lg:grid-cols-2'>
        <CardContent className='p-6'>
          <div className='flex flex-col'>
            <div className='mb-4'>
              <p className='text-xs'>Current Subscription: </p>
              <p className='text-lg font-medium capitalize'>
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
              <p className='text-xs'>Current Period</p>
              <p className='text-lg font-medium capitalize'>
                {subscription && subscription.start_date ? (
                  <>
                    {formatDate(subscription.start_date)} -{' '}
                    {(() => {
                      if (!subscription.interval) return 'No end date';
                      const endDate = new Date(subscription.start_date);
                      if (subscription.interval === 'month') {
                        endDate.setMonth(endDate.getMonth() + 1);
                      } else if (subscription.interval === 'year') {
                        endDate.setFullYear(endDate.getFullYear() + 1);
                      }
                      return formatDate(endDate.toISOString());
                    })()}
                  </>
                ) : (
                  'No active subscription'
                )}
              </p>
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
        {subscription ? (
          <CardContent className='p-6'>
            <div className='flex items-center justify-end gap-2'>
              <a href={customerPortalLink} target='_blank' rel='noreferrer'>
                <Button variant='default' size='sm' className='ml-4'>
                  Upgrade Plan
                </Button>
              </a>
              <a href={customerPortalLink} target='_blank' rel='noreferrer'>
                <Button variant='outline' size='sm'>
                  Manage Subscription
                </Button>
              </a>
            </div>
          </CardContent>
        ) : (
          ''
        )}
      </Card>
      <div className='mx-auto w-full'></div>
    </div>
  );
}
