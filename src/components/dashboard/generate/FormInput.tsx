// This component handles input for generating headshots using a predefined AI model.
// It manages user input through a form, updating local state on each input change.
// The form submission triggers an API call to generate headshots, and handles the response asynchronously.
// Uses `useEffect` to listen for changes via a real-time database subscription and updates the UI accordingly.

'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { TypeHeadshotModel } from '@/types/types';
import InputWrapper from '@/components/InputWrapper';
import { SubmitButton } from '@/components/SubmitButton';
import { errorToast, sentenceCase } from '@/utils/utils';
import { Textarea } from '@/components/ui/textarea';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import OutputGeneration from './OutputGeneration';
import { generateHeadshotFn } from '@/app/(dashboard)/home/[id]/actions';
import ModalLimitExceeded from '@/components/dashboard/generate/ModalLimitExceeded';
import { Card } from '@/components/ui/card';

interface FormInputProps {
  model: TypeHeadshotModel;
}

type FormFields = {
  prompt: string;
  'neg-prompt': string;
};

const FormInput: FC<FormInputProps> = ({ model }) => {
  const supabase = supabaseBrowserClient();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormFields>({ prompt: '', 'neg-prompt': '' });
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [hasLimitExceeded, setHasLimitExceeded] = useState(false);
  const [isPromptValid, setIsPromptValid] = useState(true);

  const router = useRouter();

  //function to check the limit of content creations and set the state accordingly
  const limitUser = useCallback(async () => {
    const { error, count } = await supabase
      .from('headshot_generations')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return errorToast(error.message);
    }
    if (count && count >= 100) {
      setHasLimitExceeded(true);
    }
  }, [supabase]);

  //checking on load if the user has reached the limit of content creations
  useEffect(() => {
    limitUser();
  }, [limitUser]);

  // Handle input change for the form fields and update the formData state with user input data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate prompt if the changed field is 'prompt'
    if (name === 'prompt') {
      const requiredPrefix = `model ${model.type}`;
      const isValid = value.trim().toLowerCase().startsWith(requiredPrefix);
      setIsPromptValid(isValid);
    }
  };

  // Asynchronously triggered by form submission
  const handleGeneration = useCallback(
    async (data: FormData) => {
      console.log('handleGeneration started, setting isPending to true');
      setIsPending(true);
      setGenerationId(null);
      setGeneratedImages([]);

      try {
        console.log('Starting handleGeneration');
        console.log('model.model_id:', model.model_id);
        console.log('FormData:', Object.fromEntries(data.entries()));

        // Call the generateHeadshotFn function to generate headshots from server actions
        let response;
        try {
          response = await generateHeadshotFn(model.model_id, data);
          console.log('Response from generateHeadshotFn:', response);
        } catch (error) {
          console.error('Error calling generateHeadshotFn:', error);
          throw error; // Re-throw the error to be caught by the outer try-catch
        }

        if (!response) {
          console.error('No response received from generateHeadshotFn');
          errorToast('Failed to generate headshot: No response received');
          return;
        }

        console.log('Response type:', typeof response);
        console.log('Response keys:', Object.keys(response));

        if (typeof response === 'object') {
          if ('error' in response) {
            console.log('Error found in response:', response.error);
            errorToast(response.error);
          } else if ('id' in response && typeof response.id === 'string') {
            console.log('ID found in response:', response.id);
            setGenerationId(response.id);
            // Don't set isPending to false here
          } else {
            console.error('Unexpected response format:', response);
            errorToast('Failed to generate headshot: Unexpected response format');
            setIsPending(false);
          }
        } else {
          console.error('Response is not an object:', response);
          errorToast('Failed to generate headshot: Invalid response');
          setIsPending(false);
        }
      } catch (error) {
        console.error('Error in handleGeneration:', error);
        errorToast('An unexpected error occurred');
        setIsPending(false);
      }
    },
    [model.model_id]
  );

  // Realtime database subscription to listen for changes in the generated images.
  // This subscription gets triggered only if the row is updated with new image URLs. It doesn't respond to insert or delete.
  useEffect(() => {
    if (!generationId) return;

    const channel = supabase
      .channel('value-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'headshot_generations',
        },
        async (payload: { new: { id: string; image_urls?: string[] } }) => {
          if (payload.new.id === generationId && payload.new.image_urls) {
            setGeneratedImages(payload.new.image_urls);
            setIsPending(false);
            setGenerationId(null);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [generationId, supabase]);

  console.log('Rendering FormInput, isPending:', isPending);

  return (
    <div className=''>
      <ModalLimitExceeded isModalOpen={hasLimitExceeded} />

      <Card className='p-6'>
        <div className=''>
          <div className='mb-6'>
            <p className='font-semibold text-default'>Model: {sentenceCase(model.name)}</p>
          </div>

          <form
            className='flex flex-col justify-between px-1'
            onSubmit={(e) => {
              e.preventDefault();
              handleGeneration(new FormData(e.currentTarget));
            }}>
            <div className='flex flex-col gap-4 mb-8'>
              <InputWrapper id='prompt' label='Describe the images you want to generate (prompt)'>
                <Textarea
                  id='prompt'
                  name='prompt'
                  placeholder={`model ${model.type} posing for a photo`}
                  rows={6}
                  value={formData.prompt}
                  onChange={handleInputChange}
                  className={!isPromptValid ? 'border-red-500' : ''}
                />
              </InputWrapper>
              {!isPromptValid && (
                <p className='text-sm text-red-500'>
                  Your prompt must start with &quot;model {model.type}&quot;
                </p>
              )}

              <p className='text-sm text-gray-400'>
                Make sure to write <b className='text-white'>model {model.type}</b> at the beginning of your
                prompt
              </p>

              {/* <InputWrapper id='neg-prompt' label='Negative Prompt'>
                <Input
                  id='neg-prompt'
                  name='neg-prompt'
                  placeholder='Negative Prompt'
                  value={formData['neg-prompt']}
                  onChange={handleInputChange}
                />
              </InputWrapper> */}
            </div>

            <SubmitButton
              className='md:max-w-xs'
              disabled={hasLimitExceeded || isPending || !isPromptValid || !formData.prompt}>
              {isPending ? 'Generating...' : 'Generate'}
            </SubmitButton>
          </form>
        </div>
      </Card>

      {/* Section to show generated results */}
      <OutputGeneration isPending={isPending || !!generationId} generatedImages={generatedImages} />
    </div>
  );
};

export default FormInput;
