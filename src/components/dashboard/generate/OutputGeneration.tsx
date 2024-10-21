// This component displays the generated headshots in a tabbed interface with 'Output' and 'History' tabs.
// It supports downloading of generated images and switching to historical generation details.
// The component is reactive, showing loading indicators or images based on the current state.

import { FC } from 'react';
import EmptyState from '@/assets/images/profile.png';
import Image from 'next/image';
import { LuLoader } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import downloadHeadshot from '@/utils/utils';
import { Download } from 'lucide-react';
import ImagesSkeleton from '../loading-skeletons/ImageSkeleton';

interface OutputGenerationProps {
  isPending: boolean;
  generatedImages?: string[];
}

// Show this blurred image while the generated images are loading
const blurImageDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEXSURBVHgBVZDPSsNAEMa//dP8WVOheFToJejBKh7E4hMIXn0FwcfwrQSvPoFevFQUIdrE0NBTXRPTcbJrxc4yLHzz229nRtzd3lCy2YdJ+og5oyiG1hpSKwhICAEXWrGgdYBeEPLdg1TKp5AOEL8kaxqqc+Ci4tr8PcP11SUuzs/+IO/YAdq70HeLx4d7JIMBtmyNpq4RhKEHheQ+GArDCDGL6f4I6egQL08TlHmO7eHQg0RLgLgHfmCbBvOiwPQtg+2K/NMqZFM3WLYtiAgbxiCvKuzs7kGsBmETZ0RuIp6CtS+7wPHJGCaKYGLTkcz4o4/Gp8wIB05fn5FNuLfyA0VZIl0cwNpPtzZRzWYknDthPVj5J/0AA1VXn/cQBtkAAAAASUVORK5CYII=';

const OutputGeneration: FC<OutputGenerationProps> = ({ isPending, generatedImages }) => {
  console.log('OutputGeneration rendered. isPending:', isPending, 'generatedImages:', generatedImages);

  return (
    <div className='w-full pl-0'>
      <div className='h-full'>
        {isPending ? (
          <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-base font-medium text-center my-10 text-default'>
                Your images will be ready in less than a minute. You can wait or find your generations later
                in images.
              </p>
            </div>
            <div className='h-[300px] grid grid-cols-1 lg:grid-cols-4 gap-4 w-full'>
              <div className='bg-secondary rounded-md items-center justify-center flex animate-pulse'>
                <LuLoader className='animate-[spin_3s_linear_infinite] text-center mb-2' size={24} />
              </div>
              <div className='h-[300px] bg-secondary rounded-md items-center justify-center flex animate-pulse'>
                <LuLoader className='animate-[spin_3s_linear_infinite] text-center mb-2' size={24} />
              </div>
              <div className='h-[300px] bg-secondary rounded-md items-center justify-center flex animate-pulse'>
                <LuLoader className='animate-[spin_3s_linear_infinite] text-center mb-2' size={24} />
              </div>
              <div className='h-[300px] bg-secondary rounded-md items-center justify-center flex animate-pulse'>
                <LuLoader className='animate-[spin_3s_linear_infinite] text-center mb-2' size={24} />
              </div>
            </div>
          </div>
        ) : generatedImages?.length ? (
          <div className=''>
            <p className='text-base font-medium text-center my-10 text-default'>Results</p>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 w-full'>
              {generatedImages?.map((imageUrl, index) => (
                <div key={index} className='relative group'>
                  <Image
                    src={imageUrl}
                    alt=''
                    width={250}
                    height={250}
                    className='border rounded-md mx-auto w-full h-[300px]'
                    placeholder='blur'
                    blurDataURL={blurImageDataUrl}
                  />
                  <div className='absolute inset-0 bg-black/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <Button
                      variant='default'
                      onClick={() => downloadHeadshot(imageUrl, `output-${index + 1}.png`)}
                      className=' text-black '>
                      <Download size={14} className='mr-2' />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-base font-medium text-center my-10 text-default'>
                Your output will be displayed here
              </p>
              {/* <Image src={EmptyState} alt='Empty-state' height={347} width={347} /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputGeneration;
