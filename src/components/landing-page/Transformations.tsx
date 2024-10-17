import { SectionTitle } from './SectionTitle';

import dan from '../../../public/dan.png';
import morgan from '../../../public/morgan.png';
import rory from '../../../public/rory.png';
import luba from '../../../public/luba.png';
import lubatwo from '../../../public/luba2.png';
import Image from 'next/image';

export default function Transformations() {
  return (
    <div className='px-4 bg-black' id='services'>
      <div className='mx-auto max-w-7xl flex flex-col items-center py-28 md:py-28 text-center'>
        <SectionTitle
          loop='Transformations'
          title='We handle just about everything'
          text='We handle everything from design to deployment to get your website shipped and ready to go!'
        />
      </div>
      {/* <div className='mx-auto max-w-7xl flex flex-col items-center pb-10 md:pb-10 text-center'></div> */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 '>
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className='mx-auto max-w-5xl grid grid-cols-2 gap-4 mb-28'>
          <div className='grid grid-cols-2 gap-4'>
            <Image src={dan} alt='dan' width={300} height={300} />
            <Image src={lubatwo} alt='dan' width={300} height={300} />
            <Image src={rory} alt='dan' width={300} height={300} />
            <Image src={luba} alt='dan' width={300} height={300} />
          </div>
          <div className=''>
            <Image src={morgan} alt='dan' width={600} height={600} />
          </div>
        </div>
        <div className='mx-auto max-w-5xl grid grid-cols-2 gap-4'>
          <div className=''>
            <Image src={lubatwo} alt='dan' width={600} height={600} />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Image src={dan} alt='dan' width={300} height={300} />
            <Image src={morgan} alt='dan' width={300} height={300} />
            <Image src={rory} alt='dan' width={300} height={300} />
            <Image src={luba} alt='dan' width={300} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}
