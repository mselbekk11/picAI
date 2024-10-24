// This component is responsible for generating headshots based on a specific model.
// It fetches model details and associated generation history from the database using the model ID.
// The 'FormInput' component is then used to allow users to input positive & negative prompts and initiate new generations.
// It is designed to respond dynamically to the 'id' parameter in the URL path, which represents the model ID.

import FormInput from '@/components/dashboard/generate/FormInput';
import ModalGeneratedImage from '@/components/dashboard/generate/ModalGeneratedImage';
import { supabaseServerClient } from '@/utils/supabase/server';
import { IoMdAdd } from 'react-icons/io';
import Link from 'next/link';
import { CardDescription } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { sentenceCase } from '@/utils/utils';
import ModalGeneratedImageWrapper from '@/components/dashboard/generate/ModalGeneratedImage';

type TypeParams = {
  params: { id: string };
  searchParams?: { form: string };
};

export default async function GenerateImage({ params, searchParams }: TypeParams) {
  const supabase = supabaseServerClient();

  // Get all the previously generated models from the database
  const { data: models } = await supabase
    .from('headshot_models')
    .select()
    .order('created_at', { ascending: false });

  const { data: model } = await supabase.from('headshot_models').select().eq('model_id', params.id).single();

  if (model == null) {
    return <p className='text-center mt-10'>Model not found.</p>;
  }

  const { data: generations } = await supabase
    .from('headshot_generations')
    .select()
    .eq('model_id', params.id);

  return (
    <div className='flex flex-col p-6'>
      {searchParams?.form === 'true' ? (
        <FormInput model={model} />
      ) : (
        <div className=''>
          <div className='flex mb-6'>
            <h2 className='text-md font-semibold mr-2'>
              Model: <span>{sentenceCase(model.name)}</span>
            </h2>
            <h2 className='text-gray-400 text-md font-semibold'>
              (Expires: <span>{formatDistanceToNow(model.expires_at!)})</span>
            </h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mr-2'>
            <Link href='?form=true'>
              <div className='w-full h-full flex items-center justify-center gap-1 bg-secondary border rounded-md min-h-[306px]'>
                <IoMdAdd />
                <p className='text-sm font-medium'>Generate headshot</p>
              </div>
            </Link>

            {generations?.map((generation) => (
              <>
                {generation.image_urls?.map((_, index) => (
                  <ModalGeneratedImageWrapper key={index} index={index} generation={generation} />
                ))}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
