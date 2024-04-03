import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Navbar() {
  const user = await getUserDetails();

  const signOut = async () => {
    'use server';

    const supabase = supabaseServerClient();
    await supabase.auth.signOut();
    return redirect('/');
  };

  return (
    <div className='w-full bg-primary text-white'>
      <div className={cn('max-w-6xl mx-auto flex justify-between p-4')}>
        <Link href='/' className='py-1 px-4 text-sm hover:underline'>
          AiB
        </Link>

        <div className='flex items-center gap-6'>
          {user ? (
            <>
              <div className='text-sm'>
                Hey, <span className='font-medium'>{user.email}</span>
              </div>
              <form action={signOut}>
                <button className='py-1 px-4 text-sm rounded-md border border-white hover:bg-white/15'>
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <p className='text-sm'>Login to Get Started</p>
              <Link
                href='/login'
                className='py-1 px-4 text-sm rounded-md border border-white hover:bg-white/15'>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
