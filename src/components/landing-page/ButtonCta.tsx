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

  const buttonLabel = user == null && label ? label : user != null && label ? 'Try Now' : 'Get Started';

  return (
    <Link
      href={user == null ? '/login' : '/generate'}
      className={cn(
        buttonVariants({ variant: 'default' }),
        'rounded-lg border border-[#51DCA3] green-btn-gradient',
        className
      )}>
      {buttonLabel}
    </Link>
  );
};

export default ButtonCta;
