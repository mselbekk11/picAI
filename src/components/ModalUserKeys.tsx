import { FC } from 'react';
import InputWrapper from './InputWrapper';
import { Input } from './ui/input';
import { SubmitButton } from './SubmitButton';
import { getAstriaKeyFromCookie, storeKeyInCookie } from '@/utils/cookie-store';
import Modal from './Modal';

interface ModalUserKeysProps {}

const ModalUserKeys: FC<ModalUserKeysProps> = () => {
  const astriaKey = getAstriaKeyFromCookie();

  const handleKeys = async (formData: FormData) => {
    'use server';

    const astria = formData.get('astria');
    if (astria) {
      storeKeyInCookie(astria as string);
    }
  };

  if (astriaKey) {
    return <></>;
  }

  return (
    <Modal>
      <p className='font-medium text-black mb-6'>Please enter the key below to try Headshot Generator.</p>

      <form className='flex flex-col justify-between'>
        <div className='flex flex-col gap-6 mb-4'>
          <InputWrapper id='astria' label='Astria'>
            <Input
              id='astria'
              name='astria'
              defaultValue={astriaKey}
              placeholder='r8_****************************'
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
