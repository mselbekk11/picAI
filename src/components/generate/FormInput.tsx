'use client';

import React, { FC, useEffect, useState } from 'react';
import InputWrapper from '../InputWrapper';
import { SubmitButton } from '../SubmitButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '../ui/input';
import OutputGeneration from './OutputGeneration';
import { TypeImageGeneration } from '../../../types/utils';
import { toast } from '../ui/use-toast';
import { generateImageFn } from '@/app/(main)/generate/actions';
import { imageModels } from '@/app/(main)/generate/models';
import { supabaseBrowserClient } from '@/utils/supabase/client';

type FormInputProps = {
  data: TypeImageGeneration[];
};

const FormInput: FC<FormInputProps> = ({ data }) => {
  const supabase = supabaseBrowserClient();

  const [isPending, isIsPending] = useState<boolean>(false);
  const [predictionId, setPredictionId] = useState<string>();
  const [generation, setGeneration] = React.useState<TypeImageGeneration>();

  const handleGeneration = async (formData: FormData) => {
    try {
      isIsPending(true);
      const id = await generateImageFn(formData);
      setPredictionId(id);
    } catch (error) {
      toast({ description: (error as Error).toString(), variant: 'destructive' });
      isIsPending(false);
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel('value-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'image_generations',
        },
        async (payload) => {
          if (payload.new.prediction_id === predictionId && payload.new.image_urls) {
            setGeneration(payload.new as TypeImageGeneration);
            isIsPending(false);
          }
        }
      )
      .subscribe();

    return async () => {
      await supabase.removeChannel(channel);
    };
    return () => {};
  }, [predictionId, supabase]);

  return (
    <div className='p-5 xl:p-0 h-auto md:h-auto '>
      <div className='block md:flex items-start space-y-10 md:space-y-0'>
        <div className='w-full md:w-1/2 md:h-[610px] md:border-r pr-0 md:pr-10'>
          <div className='mb-6'>
            <p className='text-[#27262B] text-xl font-bold leading-10'>AI Image Generation</p>
          </div>

          <form className='md:h-[545px] flex flex-col justify-between'>
            <div className='flex flex-col gap-6 mb-5'>
              <InputWrapper label='Select Model'>
                <Select name='model' defaultValue={generation?.model ?? imageModels[0].value}>
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {imageModels.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </InputWrapper>

              <InputWrapper id='prompt' label='Prompt'>
                <Input
                  id='prompt'
                  name='prompt'
                  placeholder='Image Prompt'
                  autoFocus
                  defaultValue={generation?.prompt ?? ''}
                />
              </InputWrapper>

              <InputWrapper id='neg-prompt' label='Negative Prompt'>
                <Input
                  id='neg-prompt'
                  name='neg-prompt'
                  placeholder='Negative Prompt'
                  defaultValue={generation?.negative_prompt ?? ''}
                />
              </InputWrapper>

              <div className='flex flex-col md:flex-row gap-6 md:gap-2'>
                <InputWrapper id='no-of-outputs' label='Number of Outputs' description='(min: 1, max: 4)'>
                  <Input
                    min={1}
                    max={4}
                    id='no-of-outputs'
                    name='no-of-outputs'
                    defaultValue={generation?.no_of_outputs ?? 1}
                  />
                </InputWrapper>
                <InputWrapper id='guidance' label='Guidance' description='(min: 1, max: 50)'>
                  <Input
                    min={1}
                    max={50}
                    id='guidance'
                    name='guidance'
                    defaultValue={generation?.guidance ?? 10}
                  />
                </InputWrapper>
                <InputWrapper id='inference' label='Inference' description='(min: 1, max: 500)'>
                  <Input
                    min={1}
                    max={500}
                    id='inference'
                    name='inference'
                    defaultValue={generation?.inference ?? 50}
                  />
                </InputWrapper>
              </div>
            </div>

            <SubmitButton disabled={isPending} className='w-full' formAction={handleGeneration}>
              Generate
            </SubmitButton>
          </form>
        </div>

        <OutputGeneration
          data={data}
          isPending={isPending}
          generation={generation}
          onSelectItem={(value) => setGeneration(value)}
        />
      </div>
    </div>
  );
};

export default FormInput;
