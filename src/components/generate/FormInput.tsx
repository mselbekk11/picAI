'use client';

import React, { FC, useState } from 'react';
import InputWrapper from '../InputWrapper';
import { SubmitButton } from '../SubmitButton';
import { Input } from '../ui/input';
import OutputGeneration from './OutputGeneration';
import { TypeQrCodeGeneration } from '../../../types/utils';
import { toast } from '../ui/use-toast';
import { generateQrCodeFn } from '@/app/(main)/generate/actions';
import { useRouter } from 'next/navigation';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

type FormInputProps = {
  data: TypeQrCodeGeneration[];
};

type FormFields = {
  url: string;
  prompt: string;
};

const promptSuggestions = [
  'A thar desert',
  'A beautiful sea beach',
  'A mountain view with clouds',
  'A forest overlooking a mountain',
];

const FormInput: FC<FormInputProps> = ({ data }) => {
  const [generation, setGeneration] = React.useState<TypeQrCodeGeneration>();
  const [formData, setFormData] = useState<FormFields>({ url: '', prompt: '' });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGeneration = async (data: FormData) => {
    const response = await generateQrCodeFn(data);
    if (typeof response == 'string') {
      toast({ description: response, variant: 'destructive' });
    } else {
      setGeneration(response as TypeQrCodeGeneration);
      router.refresh();
    }
  };

  return (
    <div className='p-5 xl:p-0 h-auto md:h-auto '>
      <div className='block md:flex items-start space-y-10 md:space-y-0'>
        <div className='w-full md:w-1/2 md:border-r pr-0 md:pr-10'>
          <div className='mb-6'>
            <p className='text-[#27262B] text-xl font-bold leading-10'>AI QR Code Generator</p>
          </div>

          <form className='md:h-[545px] flex flex-col justify-between'>
            <div className='flex flex-col gap-6 mb-5'>
              <InputWrapper id='url' label='Url'>
                <Input
                  id='url'
                  name='url'
                  placeholder='aiboilerplate.com'
                  autoFocus
                  value={formData.url}
                  onChange={handleInputChange}
                />
              </InputWrapper>

              <InputWrapper
                id='prompt'
                label='Prompt'
                description='This is what the image in your QR code will look like.'>
                <Textarea
                  id='prompt'
                  name='prompt'
                  placeholder='Enter your prompt here'
                  rows={3}
                  value={formData.prompt}
                  onChange={handleInputChange}
                />
              </InputWrapper>

              <InputWrapper label='Prompt suggestions'>
                <div className='grid md:grid-cols-2 gap-3'>
                  {promptSuggestions.map((prompt, index) => (
                    <Button
                      key={index}
                      type='button'
                      variant='outline'
                      className='font-normal text-black/50 rounded-xl'
                      onClick={() => setFormData({ ...formData, prompt })}>
                      {prompt}
                    </Button>
                  ))}
                </div>
              </InputWrapper>
            </div>

            <SubmitButton className='w-full' formAction={handleGeneration}>
              Generate
            </SubmitButton>
          </form>
        </div>

        <OutputGeneration
          data={data}
          generation={generation}
          onSelectItem={(value) => {
            setGeneration(value);
            setFormData({
              url: value.url,
              prompt: value.prompt,
            });
          }}
        />
      </div>
    </div>
  );
};

export default FormInput;
