// This snippet demonstrates the use of a ButtonSignout component to sign out a user from the application.
// You can use the ButtonSignout component to create sign-out buttons anywhere in your application.
'use client';
import { FC } from 'react';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';

interface ButtonSignoutProps {
  className?: string;
}
const ButtonSignoutTwo: FC<ButtonSignoutProps> = () => {
  const supabase = supabaseBrowserClient();
  const router = useRouter();

  return (
    <div
      className='cursor-pointer text-default'
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
      }}>
      <FiLogOut className='size-5 mr-2' />
    </div>
  );
};
export default ButtonSignoutTwo;
