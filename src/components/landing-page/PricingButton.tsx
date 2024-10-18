import Link from 'next/link';
import { cn } from '@/utils/utils';
import { getUserDetails } from '@/utils/supabase/server';
import { FC } from 'react';

interface ButtonCtaProps {
  tiername?: string;
  mostPopular?: boolean;
}

const PricingButton: FC<ButtonCtaProps> = async ({ tiername, mostPopular }) => {
  const user = await getUserDetails();

  // const buttonLabel = user == null && label ? label : user != null && label ? 'Sign in' : 'Generate Images';

  return (
    <Link
      href={user == null ? '/login' : '/home'}
      className={cn(
        mostPopular
          ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
          : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
        'mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
      )}>
      Choose {tiername}
    </Link>
  );
};

export default PricingButton;
