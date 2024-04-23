// This component displays the generated headshots in a tabbed interface with 'Output' and 'History' tabs.
// It supports downloading of generated images and switching to historical generation details.
// The component is reactive, showing loading indicators or images based on the current state.

import { FC, useState } from 'react';
import { TypeHeadshotGeneration } from '@/types/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { LuLoader } from 'react-icons/lu';
import downloadHeadshot, { cn, sentenceCase } from '@/utils/utils';
import { Button } from '@/components/ui/button';
import { TbDownload } from 'react-icons/tb';

interface OutputGenerationProps {
  data: TypeHeadshotGeneration[];
  isPending: boolean;
  generatedImages?: string[];
  onSelectItem: (value: TypeHeadshotGeneration) => void;
}

// Show this blurred image while the generated images are loading
const blurImageDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEXSURBVHgBVZDPSsNAEMa//dP8WVOheFToJejBKh7E4hMIXn0FwcfwrQSvPoFevFQUIdrE0NBTXRPTcbJrxc4yLHzz229nRtzd3lCy2YdJ+og5oyiG1hpSKwhICAEXWrGgdYBeEPLdg1TKp5AOEL8kaxqqc+Ci4tr8PcP11SUuzs/+IO/YAdq70HeLx4d7JIMBtmyNpq4RhKEHheQ+GArDCDGL6f4I6egQL08TlHmO7eHQg0RLgLgHfmCbBvOiwPQtg+2K/NMqZFM3WLYtiAgbxiCvKuzs7kGsBmETZ0RuIp6CtS+7wPHJGCaKYGLTkcz4o4/Gp8wIB05fn5FNuLfyA0VZIl0cwNpPtzZRzWYknDthPVj5J/0AA1VXn/cQBtkAAAAASUVORK5CYII=';

const OutputGeneration: FC<OutputGenerationProps> = ({ data, isPending, generatedImages, onSelectItem }) => {
  // Manages the active tab state
  const [currentTab, setCurrentTab] = useState('output');

  return (
    <div className='w-full md:w-1/2 ml-0 md:ml-10'>
      <Tabs defaultValue='output' value={currentTab} className='w-full h-[550px]'>
        {/* Tab option to select which section to see (e.g. Output | History) */}
        <div className='flex justify-center mb-6'>
          <TabsList className='rounded-full p-1 bg-transparent border dark:border-[#272626]'>
            <TabsTrigger onClick={() => setCurrentTab('output')} className='rounded-full' value='output'>
              Output
            </TabsTrigger>
            <TabsTrigger onClick={() => setCurrentTab('history')} className='rounded-full' value='history'>
              Images
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Output tab shows the generated Images for the selected option from the history */}
        <TabsContent value='output' className='h-full bg-[#FCFAFA] dark:bg-[#9f9f9f]/5 rounded-lg'>
          <div
            className={cn(
              'h-full grid md:justify-between gap-2 border border-black/5 rounded-lg px-5 py-4 overflow-auto',
              !isPending ? 'md:grid-cols-2' : 'grid-cols-1'
            )}>
            {isPending ? (
              <div className='flex flex-col items-center justify-center gap-4'>
                <LuLoader className='animate-[spin_3s_linear_infinite]' size={24} />
                <p className='text-sm text-center'>
                  Your images will be ready in less than a minute.
                  <br />
                  You can wait or find your generations later in the Images tab.
                </p>
              </div>
            ) : generatedImages ? (
              generatedImages?.map((imageUrl, index) => (
                <div key={index} className='relative group'>
                  <Image
                    src={imageUrl}
                    alt=''
                    width={250}
                    height={250}
                    className='border rounded-md mx-auto'
                    placeholder='blur'
                    blurDataURL={blurImageDataUrl}
                  />
                  {/* Download button to download the generated images locally */}
                  <div className='absolute inset-0 bg-black/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <Button
                      variant='outline'
                      onClick={() => downloadHeadshot(imageUrl, `output-${index + 1}.png`)}
                      className='rounded-full'>
                      <TbDownload className='mr-2' />
                      Download
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-sm'>See the generated image here...</p>
            )}
          </div>
        </TabsContent>

        {/* History tab conatining the already generated (trained) Images */}
        <TabsContent value='history' className='h-full bg-[#9f9f9f]/5'>
          <div className='h-full border border-black/5 rounded-lg px-5 py-4 space-y-2 overflow-auto'>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <div
                  key={index}
                  className='p-2 gap-4 flex items-center rounded-lg bg-white hover:bg-gray-200 dark:bg-[#1F1F1F] dark:hover:bg-[#383838] cursor-pointer mb-2'
                  onClick={() => {
                    setCurrentTab('output');
                    onSelectItem(item);
                  }}>
                  <div className='text-sm font-semibold'>{index + 1}.</div>
                  <p className='text-sm font-semibold leading-5 truncate'>{sentenceCase(item.prompt)}</p>
                </div>
              ))
            ) : (
              <p className='text-sm'>No generation found.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OutputGeneration;
