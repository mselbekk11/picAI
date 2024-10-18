// This component is used as a reusable call-to-action button across different parts of the website.
// It can be configured with different labels and actions, making it versatile for various user interactions.
// The component accepts props such as `label` (to display button text) and `onClick` (to handle button clicks).

import Link from 'next/link';
import { cn } from '@/utils/utils';
import { buttonVariants } from '../ui/button';
import { getUserDetails } from '@/utils/supabase/server';
import { FC } from 'react';

interface ButtonCtaProps {
  className?: string;
  label?: string;
}

const ButtonCta: FC<ButtonCtaProps> = async ({ className, label }) => {
  const user = await getUserDetails();

  const buttonLabel = user == null && label ? label : user != null && label ? 'Sign in' : 'Generate Images';

  return (
    <Link
      href={user == null ? '/login' : '/home'}
      className={cn(
        buttonVariants({ variant: 'default' }),
        'rounded-lg bg-[#5454EC] hover:bg-[#4343bd] ',
        className
      )}>
      {buttonLabel}
    </Link>
  );
};

export default ButtonCta;
