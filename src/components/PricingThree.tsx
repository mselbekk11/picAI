'use client';

import { useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import { Check } from 'lucide-react';
import ButtonPayment from './ButtonPayment';
import { TypeSubscriptionPlan, TypeSubscriptionInterval } from '@/types/types';
import { Card } from './ui/card';

interface Subscription {
  type: 'free' | 'standard' | 'premium';
  amount: number | null;
  interval: 'month' | 'year' | null;
  start_date: string | null;
}

interface PricingThreeProps {
  subscription: Subscription | null;
}

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
];
const tiers = [
  {
    name: 'Standard',
    id: 'tier-freelancer',
    href: '#',
    price: { monthly: '$19', annually: '$199' },
    description: 'Great for exploring AI images, for personal use only',
    features: [
      'Royalty free ownership of images',
      '1 custom model per month',
      '80 images per month',
      'Highest quality Flux model',
    ],
    featured: false,
    cta: 'Buy plan',
    provider: 'stripe',
    tier: 'standard',
    frequency: { monthly: 'monthly', annually: 'annually' },
  },
  {
    name: 'Premium',
    id: 'tier-startup',
    href: '#',
    price: { monthly: '$49', annually: '$499' },
    description: 'Full, commercial ownership of images',
    features: [
      'Full, commercial ownership of images',
      '3 custom models per month',
      '300 images per month',
      'Highest quality Flux model',
    ],
    featured: false,
    cta: 'Buy plan',
    provider: 'stripe',
    tier: 'premium',
    frequency: { monthly: 'monthly', annually: 'annually' },
  },
  // {
  //   name: 'Enterprise',
  //   id: 'tier-enterprise',
  //   href: '#',
  //   price: 'Custom',
  //   description: 'Dedicated support and infrastructure for your company.',
  //   features: [
  //     'Unlimited products',
  //     'Unlimited subscribers',
  //     'Advanced analytics',
  //     '1-hour, dedicated support response time',
  //     'Marketing automations',
  //     'Custom reporting tools',
  //   ],
  //   featured: true,
  //   cta: 'Contact sales',
  // },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function PricingThree({ subscription }: PricingThreeProps) {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className=''>
      <div className='mx-auto w-full'>
        <div className='flex justify-center my-6'>
          <fieldset aria-label='Payment frequency'>
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className='grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset dark:ring-[#27272a] ring-[#e4e4e7] dark:bg-[#27272a66] bg-[#f4f4f566]'>
              {frequencies.map((option) => (
                <Radio
                  key={option.value}
                  value={option}
                  className='cursor-pointer rounded-full px-2.5 py-1 dark:data-[checked]:bg-white dark:data-[checked]:text-black data-[checked]:bg-[#38383a] data-[checked]:text-white'>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </fieldset>
        </div>
        <div className='isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
          {tiers.map((tier) => (
            <Card key={tier.id} className={classNames('rounded-lg p-8 xl:p-10')}>
              <h3 id={tier.id} className={classNames('text-lg font-semibold leading-8')}>
                {tier.name}
              </h3>
              <p className={classNames('mt-4 text-sm leading-6')}>{tier.description}</p>
              <p className='mt-6 flex items-baseline gap-x-1'>
                <span className={classNames('text-4xl font-semibold tracking-tight')}>
                  {typeof tier.price === 'string'
                    ? tier.price
                    : tier.price[frequency.value as keyof typeof tier.price]}
                </span>
                {typeof tier.price !== 'string' ? (
                  <span className={classNames('text-sm font-semibold leading-6')}>
                    {frequency.priceSuffix}
                  </span>
                ) : null}
              </p>
              {!subscription ? (
                <ButtonPayment
                  provider={tier.provider as 'stripe'}
                  tier={tier.tier as TypeSubscriptionPlan}
                  frequency={
                    tier.frequency[frequency.value as keyof typeof tier.frequency] as TypeSubscriptionInterval
                  }
                />
              ) : (
                <div className='my-6 border-b border-2'></div>
              )}
              <ul role='list' className={classNames('space-y-3 text-sm leading-6 ')}>
                {tier.features.map((feature) => (
                  <li key={feature} className='flex gap-x-3'>
                    <Check aria-hidden='true' color='#00FF00' className={classNames('h-6 w-5 flex-none')} />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
