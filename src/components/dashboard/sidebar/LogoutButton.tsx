import { getUserDetails } from '@/utils/supabase/server';
import { cn } from '@/utils/utils';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import ButtonSignoutTwo from './ButtonSignoutTwo';

const LogoutButton = async () => {
  const user = await getUserDetails();

  return (
    <div
      className={cn(
        buttonVariants({ variant: 'secondary', size: 'lg' }),
        'flex justify-between px-4 py-2 !w-full gap-2 cursor-pointer'
      )}>
      <div className='flex items-center gap-2'>
        <Image
          src={user?.user_metadata?.avatar_url ?? '/avatar.png'}
          className='size-5 rounded-full'
          width={20}
          height={20}
          alt='avatar'
        />
        <p className='font-semibold text-default'>{user?.user_metadata?.full_name} </p>
      </div>
      <ButtonSignoutTwo />
    </div>
  );
};

export default LogoutButton;
