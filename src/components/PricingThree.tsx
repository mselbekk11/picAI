'use client';

import { useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import { Check } from 'lucide-react';
import ButtonPayment from './ButtonPayment';
import { TypeSubscriptionPlan, TypeSubscriptionInterval } from '@/types/types';

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
      '1 custom model per month',
      '80 images per month',
      'Royalty free ownership of images',
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

export default function PricingThree() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className=''>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mt-16 flex justify-center'>
          <fieldset aria-label='Payment frequency'>
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className='grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200'>
              {frequencies.map((option) => (
                <Radio
                  key={option.value}
                  value={option}
                  className='cursor-pointer rounded-full px-2.5 py-1 data-[checked]:bg-indigo-600 data-[checked]:text-white'>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </fieldset>
        </div>
        <div className='isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? 'bg-gray-900 ring-gray-900' : 'ring-gray-200',
                'rounded-lg p-8 ring-1 xl:p-10'
              )}>
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
              {/* <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
                    : 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
                  'mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                )}>
                {tier.cta}
              </a> */}
              <ButtonPayment
                provider={tier.provider as 'stripe'}
                tier={tier.tier as TypeSubscriptionPlan}
                frequency={
                  tier.frequency[frequency.value as keyof typeof tier.frequency] as TypeSubscriptionInterval
                }
              />
              <ul role='list' className={classNames('mt-8 space-y-3 text-sm leading-6 xl:mt-10')}>
                {tier.features.map((feature) => (
                  <li key={feature} className='flex gap-x-3'>
                    <Check aria-hidden='true' className={classNames('h-6 w-5 flex-none')} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
