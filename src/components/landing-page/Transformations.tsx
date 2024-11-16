import { SectionTitle } from './SectionTitle';

import Image from 'next/image';
import one from '../../../public/1.png';
import two from '../../../public/2.png';
import three from '../../../public/3.png';
import four from '../../../public/4.png';
import five from '../../../public/5.png';
import six from '../../../public/6.png';
import seven from '../../../public/7.png';
import eight from '../../../public/8.png';
import aimorgan from '../../../public/ai-morgan.png';
import ailuba from '../../../public/luba-queen.png';

import { Caveat as CaveatFont } from 'next/font/google';
const caveat = CaveatFont({ subsets: ['latin'] });

export default function Transformations() {
  return (
    <div className='px-4 bg-black' id='services'>
      <div className='mx-auto max-w-7xl flex flex-col items-center py-28 md:py-28 text-center'>
        <SectionTitle
          loop='Transformations'
          title='Upload your selfies and get AI generated images'
          text='We handle everything from design to deployment to get your website shipped and ready to go!'
        />
      </div>
      {/* <div className='mx-auto max-w-7xl flex flex-col items-center pb-10 md:pb-10 text-center'></div> */}
      <div className='mx-auto max-w-7xl sm:px-0 lg:px-8 '>
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className='mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-28'>
          <div className='grid grid-cols-2 gap-4 lg:gap-6'>
            <Image src={one} alt='dan' width={300} height={300} className='rounded-lg' />
            <Image src={two} alt='dan' width={300} height={300} className='rounded-lg' />
            <Image src={three} alt='dan' width={300} height={300} className='rounded-lg' />
            <Image src={four} alt='dan' width={300} height={300} className='rounded-lg' />
          </div>
          <div className='relative'>
            <div
              className={`absolute top-0 left-0 text-white bg-[#af40e2] p-2 rounded-lg ${caveat.className}`}>
              AI Generated Photo
            </div>
            <Image
              src={aimorgan}
              alt='dan'
              width={600}
              height={600}
              className='rounded-lg border-4 border-[#af40e2]'
            />
          </div>
        </div>
        <div className='mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16'>
          <div className='relative order-last lg:order-first'>
            <div
              className={`absolute top-0 right-0 text-white bg-[#af40e2] p-2 rounded-lg ${caveat.className}`}>
              AI Generated Photo
            </div>
            <Image
              src={ailuba}
              alt='dan'
              width={600}
              height={600}
              className='rounded-lg border-4 border-[#af40e2]'
            />
          </div>
          <div className='grid grid-cols-2 gap-4 lg:gap-6'>
            <Image src={five} alt='dan' width={300} height={300} className='rounded-lg' />
            <Image src={six} alt='dan' width={300} height={300} className='rounded-lg' />
            <Image src={seven} alt='dan' width={300} height={300} className='rounded-lg' />
            <Image src={eight} alt='dan' width={300} height={300} className='rounded-lg' />
          </div>
        </div>
      </div>
    </div>
  );
}
