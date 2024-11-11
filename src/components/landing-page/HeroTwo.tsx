import { Inter } from 'next/font/google';
import ButtonShootingStarBorder from './ButtonShootingStarBorder';

const inter = Inter({ subsets: ['latin'] });

export default function HeroTwo() {
  return (
    <div className='px-4 home'>
      <div className='mx-auto max-w-7xl flex flex-col items-center pt-10 lg:py-28 text-center'>
        <div className='flex flex-col items-center w-full'>
          <h1 className='text-2xl md:text-4xl lg:text-6xl font-semibold py-6 intro animate-slideFromDownAndFade text-white'>
            Create Stunning
            <br className='block' />
            <span className='animate'>AI Generated Images</span>
          </h1>
        </div>
        <div className='w-full flex flex-col items-center'>
          <div className='py-6 max-w-2xl'>
            <h3
              className={`text-sm md:text-base font-medium text-white pb-12 animate-slideFromDownAndFade [animation-delay:var(--animation-delay)] ${inter.className}`}>
              Transform your selfies into studio quality images using AI <br /> Perfect for social media,
              profile pictures, or just for fun!
            </h3>
            <div className='flex justify-center animate-slideFromDownAndFade [animation-delay:var(--animation-delay)]'>
              {/* <ButtonOne text='Contact Now' /> */}

              {/* <ButtonCta className='px-10 py-6 h-10' /> */}

              <ButtonShootingStarBorder label='Generate Images' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
