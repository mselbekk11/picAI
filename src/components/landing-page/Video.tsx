import { SectionTitle } from './SectionTitle';
import Image from 'next/image';
import videosrc from '../../../public/video.png';
import VideoOne from '../videos/VideoOne';

export default function Video() {
  return (
    <div className='px-4 bg-black' id='howitworks'>
      <div className='mx-auto max-w-7xl flex flex-col items-center py-28 md:py-28 text-center'>
        <SectionTitle
          loop='How It Works'
          title={`A Quick Guide on how to use PicAI`}
          text='Here is a demonstration of how to create Models and then generate images, which you can download and share'
        />
      </div>
      <div className='mx-auto max-w-3xl flex flex-col items-center text-center'>
        <VideoOne />
      </div>
    </div>
  );
}
