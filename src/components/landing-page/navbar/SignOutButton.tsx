'use client';

import { FC } from 'react';
<<<<<<<< HEAD:src/components/generate/SignOutButton.tsx
========
import { Button } from '../../ui/button';
>>>>>>>> 5e9f38392ac7721f7cc855d3df70e1946cfa1292:src/components/landing-page/navbar/SignOutButton.tsx
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = () => {
  const supabase = supabaseBrowserClient();

  const router = useRouter();

  return (
    <Button
      variant='outline'
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
      }}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
