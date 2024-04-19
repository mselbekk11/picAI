'use client';

import { FC, useEffect, useState } from 'react';
import { TypeHeadshotGeneration, TypeHeadshotModel } from '@/types/types';
import InputWrapper from '../../InputWrapper';
import { SubmitButton } from '../../SubmitButton';
import { errorToast, sentenceCase } from '@/utils/utils';
import { Textarea } from '../../ui/textarea';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { generateHeadshotFn } from '@/app/generate/[id]/actions';
import OutputGeneration from './OutputGeneration';

interface FormInputProps {
  model: TypeHeadshotModel;
  generations: TypeHeadshotGeneration[];
}

type FormFields = {
  prompt: string;
  'neg-prompt': string;
};

const FormInput: FC<FormInputProps> = ({ model, generations }) => {
  const supabase = supabaseBrowserClient();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormFields>({ prompt: '', 'neg-prompt': '' });
  const [generationId, setGenerationId] = useState<string>();
  const [generatedImages, setGeneratedImages] = useState<string[]>();

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGeneration = async (data: FormData) => {
    setIsPending(true);

    const response = await generateHeadshotFn(model.model_id, data);
    if (typeof response == 'string') {
      errorToast(response);
      setIsPending(false);
    } else {
      setGenerationId(response.id);
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
          table: 'headshot_generations',
        },
        async (payload) => {
          if (payload.new.id === generationId && payload.new.image_urls) {
            setGeneratedImages(payload.new.image_urls);
            setIsPending(false);
            router.refresh();
          }
        }
      )
      .subscribe();

    return async () => {
      await supabase.removeChannel(channel);
    };
    return () => {};
  }, [generationId, supabase, router]);

  return (
    <div className='p-5 xl:p-0 h-auto md:h-auto '>
      <div className='block md:flex items-start space-y-10 md:space-y-0'>
        <div className='w-full md:w-1/2 md:border-r pr-0 md:pr-10'>
          <div className='mb-6'>
            <p className='text-white text-xl font-bold leading-10'>AI Headshot Generation</p>
            <p className='text-white font-semibold mt-6'>Model: {sentenceCase(model.name)}</p>
          </div>

          <form className='md:h-[500px] flex flex-col justify-between'>
            <div className='flex flex-col gap-6 mb-5'>
              <InputWrapper className='text-white' id='prompt' label='Detailed Description'>
                <Textarea
                  id='prompt'
                  name='prompt'
                  placeholder='Write a detailed description of the image you want'
                  rows={6}
                  autoFocus
                  value={formData.prompt}
                  onChange={handleInputChange}
                  className='bg-[#1b1b1b80] border border-transparent'
                />
              </InputWrapper>

              <InputWrapper className='text-white' id='neg-prompt' label='Negative Prompt'>
                <Textarea
                  id='neg-prompt'
                  name='neg-prompt'
                  placeholder='Negative Prompt'
                  rows={3}
                  value={formData['neg-prompt']}
                  onChange={handleInputChange}
                  className='bg-[#1b1b1b80] border border-transparent'
                />
              </InputWrapper>
            </div>

            <SubmitButton className='w-full bg-[#161616] rounded-2xl' formAction={handleGeneration}>
              Generate
            </SubmitButton>
          </form>
        </div>

        <OutputGeneration
          data={generations}
          isPending={isPending}
          generatedImages={generatedImages}
          onSelectItem={(value) => {
            setGeneratedImages(value.image_urls!);
            setFormData({
              prompt: value.prompt,
              'neg-prompt': value.negative_prompt ?? '',
            });
          }}
        />
      </div>
    </div>
  );
};

export default FormInput;
