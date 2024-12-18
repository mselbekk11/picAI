// This component is responsible for generating headshots based on a specific model.
// It fetches model details and associated generation history from the database using the model ID.
// The 'FormInput' component is then used to allow users to input positive & negative prompts and initiate new generations.
// It is designed to respond dynamically to the 'id' parameter in the URL path, which represents the model ID.

import FormInput from '@/components/dashboard/generate/FormInput';
import { supabaseServerClient } from '@/utils/supabase/server';
import { IoMdAdd } from 'react-icons/io';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { sentenceCase } from '@/utils/utils';
import ModalGeneratedImageWrapper from '@/components/dashboard/generate/ModalGeneratedImage';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type TypeParams = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ form: string }>;
};

export default async function GenerateImage(props: TypeParams) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const supabase = await supabaseServerClient();

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
          <Card className='mb-6 p-6'>
            <div className='flex mb-6'>
              <h2 className='text-md font-semibold mr-2'>
                Model: <span>{sentenceCase(model.name)}</span>
              </h2>
              <h2 className='text-gray-400 text-md font-semibold'>
                (Expires: <span>{formatDistanceToNow(model.expires_at!)})</span>
              </h2>
            </div>
            <Link href='?form=true'>
              <Button className=''>
                <IoMdAdd />
                <p className='text-sm font-medium'>Generate headshot</p>
              </Button>
            </Link>
          </Card>
          {generations && generations.length > 1 ? (
            <Card className='p-6'>
              <div className='grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                {generations?.map((generation) => (
                  <React.Fragment key={generation.id}>
                    {generation.image_urls?.map((_, index) => (
                      <ModalGeneratedImageWrapper
                        key={`${generation.id}-${index}`}
                        index={index}
                        generation={generation}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </Card>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
}
