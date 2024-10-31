'use client';

import { useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';
import { SectionTitle } from './SectionTitle';

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
    mostPopular: false,
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
    mostPopular: true,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function PricingFour() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className='bg-black' id='pricing'>
      <div className='mx-auto max-w-7xl flex flex-col items-center py-28 md:py-28 text-center'>
        <SectionTitle
          loop='Pricing'
          title='Flexible Pricing to Fit Your Needs.'
          text='We handle everything from design to deployment to get your website shipped and ready to go!'
        />
      </div>
      <div className='mx-auto max-w-5xl'>
        <div className='flex justify-center my-6'>
          <fieldset aria-label='Payment frequency'>
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className='grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-[#232324]  bg-[#161617]'>
              {frequencies.map((option) => (
                <Radio
                  key={option.value}
                  value={option}
                  className='cursor-pointer rounded-full px-2.5 py-1 data-[checked]:bg-white data-[checked]:text-black text-white'>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </fieldset>
        </div>
        <div className='isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={classNames(
                'rounded-lg p-8 xl:p-10 bg-[#161617] text-white border-2 border-[#232324]'
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
              {/* <PricingButton tiername={tier.name} mostPopular={tier.mostPopular} /> */}
              {/* <UserButtonWrapper tiername={tier.name} mostPopular={tier.mostPopular} /> */}
              <Link href={'/login'}>
                <Button className='w-full my-6 bg-[#5454EC] transition-colors duration-200 hover:bg-[#4343bd] text-white'>
                  Buy {tier.name}
                </Button>
              </Link>
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
