'use client';

import { FC } from 'react';
import { Button } from '../../ui/button';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = () => {
  const supabase = supabaseBrowserClient();

  const router = useRouter();

  return (
    <>
      <Button
        onClick={async () => {
          await supabase.auth.signOut();
          router.refresh();
        }}>
        Sign Out
      </Button>
    </>
  );
};

export default SignOutButton;
