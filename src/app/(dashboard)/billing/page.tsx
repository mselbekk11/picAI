import { Check, Zap } from 'lucide-react';
import { SectionTitle } from '@/components/landing-page/SectionTitle';
import PricingButton from '@/components/landing-page/PricingButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PricingThree from '@/components/PricingThree';

// const frequencies = [
//   { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
//   { value: 'annually', label: 'Annually', priceSuffix: '/year' },
// ];
const tiers = [
  {
    name: 'Starter',
    id: 'tier-freelancer',
    href: '#',
    price: '$16',
    description: 'For personal use only',
    features: ['1 custom model per month', '80 images per month', 'Highest quality Flux model'],
    mostPopular: false,
  },
  {
    name: 'Creator',
    id: 'tier-startup',
    href: '#',
    price: '$39',
    description: 'Full, commercial ownership of images',
    features: ['3 custom models per month', '300 images per month', 'Highest quality Flux model'],
    mostPopular: true,
  },
  {
    name: 'Professional',
    id: 'tier-enterprise',
    href: '#',
    price: '$89',
    description: 'Full, commercial ownership of images',
    features: ['5 custom models per month', '1000 images per month', 'Highest quality Flux model'],
    mostPopular: false,
  },
];

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Billing() {
  return (
    <div className=''>
      <Card className='mb-6 grid grid-cols-1 lg:grid-cols-2'>
        <CardContent className='p-6'>
          <div className='flex flex-col'>
            <div className='mb-4'>
              <p className='text-xs'>Current Subscription: </p>
              <p className='text-lg font-medium'>Starter Plan - $16/mo</p>
              <p className='text-xs text-slate-500'>Current Period: 10/23/2024 - 11/23/2024</p>
            </div>
            <div className='mb-4'>
              <p className='text-xs'>Image Credits:</p>
              <p className='text-lg font-medium'>76</p>
            </div>
            <div className='mb-4'>
              <p className='text-xs'>Model Credits:</p>
              <p className='text-lg font-medium'>0</p>
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
      <div className='mx-auto w-full'>
        {/* <div className='isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'bg-[#090924] ring-2 ring-indigo-500' : 'ring-1 ring-white/10',
                'rounded-3xl p-8 xl:p-10'
              )}>
              <div className='flex items-center justify-between gap-x-4'>
                <h3 id={tier.id} className='text-lg font-semibold leading-8 text-white'>
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className='rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white'>
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className='mt-4 text-sm leading-6 text-gray-300'>{tier.description}</p>
              <p className='mt-6 flex items-baseline gap-x-1'>
                <span className='text-4xl font-bold tracking-tight text-white'>{tier.price}</span>
              </p>
              <PricingButton tiername={tier.name} mostPopular={tier.mostPopular} />
              <ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10'>
                {tier.features.map((feature) => (
                  <li key={feature} className='flex gap-x-3'>
                    <Check aria-hidden='true' className='h-6 w-5 flex-none text-white' />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}
        <PricingThree />
      </div>
    </div>
  );
}
