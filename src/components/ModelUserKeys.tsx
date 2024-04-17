import { FC } from 'react';
import InputWrapper from './InputWrapper';
import { Input } from './ui/input';
import { SubmitButton } from './SubmitButton';
import { getKeysFromCookie, storeKeysInCookie } from '@/utils/cookieStore';
import Modal from './Model';

interface ModalUserKeysProps {}

const ModalUserKeys: FC<ModalUserKeysProps> = () => {
  const { deepgram, openai } = getKeysFromCookie(['openai', 'deepgram']);

  if (openai && deepgram) {
    return null;
  }

  const handleKeys = async (formData: FormData) => {
    'use server';

    const openai = formData.get('openai') as string;
    const deepgram = formData.get('deepgram') as string;

    storeKeysInCookie({ openai, deepgram });
  };

  return (
    <Modal>
      <p className='font-medium text-black mb-6'>Please enter the keys below to use the respective tools.</p>

      <form className='flex flex-col justify-between'>
        <div className='flex flex-col gap-6 mb-4'>
          <InputWrapper id='openai' label='OpenAI'>
            <Input
              id='openai'
              name='openai'
              defaultValue={openai && openai}
              placeholder='sk-****************************'
            />
          </InputWrapper>
        </div>

        <SubmitButton className='w-full' formAction={handleKeys}>
          Generate
        </SubmitButton>
      </form>
    </Modal>
  );
};

export default ModalUserKeys;
