import { SectionTitle } from './SectionTitle';
import Image from 'next/image';
import picai from '../../../public/picai.png';

export default function Video() {
  return (
    <div className='px-4 bg-black' id='howitworks'>
      <div className='mx-auto max-w-7xl flex flex-col items-center py-28 md:py-28 text-center'>
        <SectionTitle
          loop='How It Works'
          title={`Start producing high quality AI photographs instantly`}
          text=''
        />
      </div>
      <div className='mx-auto max-w-5xl flex flex-col items-center text-center'>
        <Image src={picai} width={1500} height={1500} alt='Image of software' className='w-full' />
      </div>
    </div>
  );
}
