'use client';

import { FC, useState } from 'react';
import { Input } from '../ui/input';
import { SubmitButton } from '../SubmitButton';
import { Button } from '../ui/button';
import { signIn, signUp } from '@/app/login/actions';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

interface EmailAuthProps {}

const EmailAuth: FC<EmailAuthProps> = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const router = useRouter();

  const authStatusLabel = isLogin ? "Don't have an account?" : 'Already have an account?';

  const handleFormAction = async (formData: FormData) => {
    let error;

    if (isLogin) {
      error = await signIn(formData);
    } else {
      error = await signUp(formData);
    }

    if (error) {
      toast({ description: error, variant: 'destructive' });
      return;
    }

    router.push('/generate');
  };

  return (
    <form className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mt-2'>
      {!isLogin && (
        <Input
          id='full-name'
          name='full-name'
          placeholder='Name'
          required
          className='text-white mb-2 border-[#FFFFFF2B]/15 h-11'
        />
      )}
      <Input
        id='email'
        name='email'
        placeholder='Email'
        required
        className='text-white mb-2 border-[#FFFFFF2B]/15 h-11'
      />
      <Input
        id='password'
        type='password'
        name='password'
        placeholder='Password'
        required
        className='text-white mb-6 border-[#FFFFFF2B]/15 h-11'
      />

      <SubmitButton
        formAction={handleFormAction}
        className='h-12 bg-gradient-to-r from-[#26AB75E5] to-[#26AB75]'>
        {isLogin ? 'Sign In' : 'Sign Up'}
      </SubmitButton>

      <div className='text-sm text-white/50 font-light text-center mt-4'>
        <span>{authStatusLabel}</span>
        <Button
          type='button'
          variant='link'
          onClick={() => setIsLogin(!isLogin)}
          className='text-sm font-light text-[#18EDA7] px-2'>
          {isLogin ? 'Register' : 'Login'}
        </Button>
      </div>
    </form>
  );
};

export default EmailAuth;
