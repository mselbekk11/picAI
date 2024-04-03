import { FC } from 'react';
import { SubmitButton } from '../SubmitButton';
import { headers } from 'next/headers';
import { supabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import InputWrapper from '../InputWrapper';
import { Input } from '../ui/input';
import SeparatorOr from '../ui/separator-or';

interface EmailAuthProps {
  searchParams: { error: string };
}

const EmailAuth: FC<EmailAuthProps> = ({ searchParams }) => {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = supabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(`/login?error=${error}`);
    }

    return redirect('/preview');
  };

  const signUp = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = supabaseServerClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect(`/login?error=${error}`);
    }

    return redirect('/preview');
  };

  return (
    <form className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mt-2'>
      <InputWrapper id='email' label='Email'>
        <Input id='email' name='email' placeholder='you@example.com' required className='mb-2' />
      </InputWrapper>
      <InputWrapper id='password' label='Password'>
        <Input
          id='password'
          type='password'
          name='password'
          placeholder='••••••••'
          required
          className='mb-6'
        />
      </InputWrapper>

      <SubmitButton formAction={signIn}>Sign In</SubmitButton>
      <SeparatorOr />
      <SubmitButton formAction={signUp} variant='outline' loaderColor='black'>
        Sign Up
      </SubmitButton>
      {searchParams?.error && (
        <p className='mt-4 py-2.5 bg-foreground/10 rounded text-xs text-red-700 text-center'>
          {searchParams.error}
        </p>
      )}
    </form>
  );
};

export default EmailAuth;
