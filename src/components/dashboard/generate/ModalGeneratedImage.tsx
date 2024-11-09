import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TypeHeadshotGeneration } from '@/types/types';
import Image from 'next/image';
import { supabaseServerClient } from '@/utils/supabase/server';
import { formatDate, sentenceCase } from '@/utils/utils';
import DeleteImageButton from './DeleteImageButton';
import DownloadButton from './DownloadButton';

interface ModalGeneratedImageProps {
  index: number;
  generation: TypeHeadshotGeneration;
}

const ModalGeneratedImage: FC<ModalGeneratedImageProps> = async ({ index, generation }) => {
  const supabase = await supabaseServerClient();
  const { data: model } = await supabase
    .from('headshot_models')
    .select('id, name')
    .eq('model_id', generation.model_id)
    .single();

  const imageUrl = generation.image_urls?.[index];

  return (
    <Dialog>
      <DialogTrigger>
        <Image src={imageUrl!} alt='' width={300} height={450} className='w-full object-cover rounded-md' />
      </DialogTrigger>
      <DialogContent className='w-11/12 rounded-lg p-4'>
        <DialogHeader className='h-10 border-b'>
          <DialogTitle className='text-lg font-medium line-clamp-1'>
            {sentenceCase(generation.prompt)}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-5'>
          <Image
            src={imageUrl!}
            alt=''
            width={300}
            height={450}
            className='w-full h-[400px] object-cover rounded-md'
          />

          <div>
            <p className='font-semibold'>Prompt</p>
            <p className='text-sm line-clamp-2'>{sentenceCase(generation.prompt)}</p>
          </div>

          <div className='flex items-start gap-6'>
            <div>
              <p className='font-semibold'>Model Name</p>
              <p className='text-sm'>{model?.name}</p>
            </div>
            <div>
              <p className='font-semibold'>Created</p>
              <p className='text-sm'>{formatDate(generation?.created_at)}</p>
            </div>
          </div>
          <DialogFooter className='grid grid-cols-2 gap-2'>
            <DeleteImageButton generationId={generation.id} imageIndex={index} />
            {/* <Link href={`/home/${generation.model_id}?form=true`} className=''>
              <Button className='w-full'>Generate New</Button>
            </Link> */}
            <DownloadButton imageUrl={imageUrl!} fileName={`output-${index + 1}.png`} />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalGeneratedImage;
