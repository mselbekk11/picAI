import { Check } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import PricingButton from './PricingButton';

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

export default function PricingTwo() {
  return (
    <div className='bg-black' id='pricing'>
      <div className='mx-auto max-w-7xl flex flex-col items-center py-28 md:py-28 text-center'>
        <SectionTitle
          loop='Pricing'
          title='Flexible Pricing to Fit Your Needs.'
          text='We handle everything from design to deployment to get your website shipped and ready to go!'
        />
      </div>
      <div className='mx-auto max-w-6xl px-6 lg:px-8'>
        {/* <div className='flex justify-center'>
          <fieldset aria-label='Payment frequency'>
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className='grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-white'>
              {frequencies.map((option) => (
                <Radio
                  key={option.value}
                  value={option}
                  className='cursor-pointer rounded-full px-2.5 py-1 data-[checked]:bg-indigo-500'>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </fieldset>
        </div> */}
        <div className='isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
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
        </div>
      </div>
    </div>
  );
}
