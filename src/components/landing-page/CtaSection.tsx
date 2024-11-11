import ButtonShootingStarBorder from './ButtonShootingStarBorder';

export default function CtaSection() {
  return (
    <div className='bg-black px-4'>
      <div className='mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-0'>
        <div className='relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16 rounded-2xl'>
          <h2 className='mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl'>
            Start taking AI Photos now
          </h2>
          <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300'>
            Create photorealistic images of people with PicAI
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            {/* <ButtonCta className='px-10 py-6 h-10' /> */}
            <ButtonShootingStarBorder label='Generate Images' />
          </div>
          <svg
            viewBox='0 0 1024 1024'
            aria-hidden='true'
            className='absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]'>
            <circle
              r={512}
              cx={512}
              cy={512}
              fill='url(#827591b1-ce8c-4110-b064-7cb85a0b1217)'
              fillOpacity='0.7'
            />
            <defs>
              <radialGradient id='827591b1-ce8c-4110-b064-7cb85a0b1217'>
                <stop stopColor='#7775D6' />
                <stop offset={1} stopColor='#E935C1' />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
