import Link from 'next/link';
import { getUserDetails } from '@/utils/supabase/server';
import { FC } from 'react';

interface ButtonShootingStarBorderProps {
  className?: string;
  label?: string;
}

const ButtonShootingStarBorder: FC<ButtonShootingStarBorderProps> = async ({ label }) => {
  const user = await getUserDetails();

  const buttonLabel = user == null && label ? label : user != null && label ? 'Sign in' : 'Generate Images';

  return (
    <Link href={user == null ? '/login' : '/home'}>
      <button className='group relative grid overflow-hidden rounded-lg px-10 py-4 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200'>
        <span>
          <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-lg [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
        </span>
        <span className='backdrop absolute inset-[3px] rounded-lg bg-[#5454EC] transition-colors duration-200 group-hover:bg-[#4343bd]' />
        <span className='z-10 py-0.5 text-base text-neutral-100'>{buttonLabel}</span>
      </button>
    </Link>
  );
};

export default ButtonShootingStarBorder;

// export default async function ButtonShootingStarBorder() {

// }
