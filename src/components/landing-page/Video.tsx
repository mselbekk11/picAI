import { SectionTitle } from './SectionTitle';
import Image from 'next/image';
import videosrc from '../../../public/video.png';

export default function Video() {
  return (
    <div className='px-4 bg-black' id='howitworks'>
      <div className='mx-auto max-w-7xl flex flex-col items-center py-28 md:py-28 text-center'>
        <SectionTitle
          loop='Video'
          title='We handle just about everything'
          text='We handle everything from design to deployment to get your website shipped and ready to go!'
        />
      </div>
      <div className='mx-auto max-w-7xl flex flex-col items-center pb-10 md:pb-10 text-center'>
        <Image src={videosrc} alt='video' width={1000} height={1000} />
      </div>
    </div>
  );
}
