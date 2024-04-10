import { cn } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import ButtonCta from '../landing-page/ButtonCta';
import SignOutButton from './SignOutButton';
import { getUserDetails } from '@/utils/supabase/server';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
import ModalAccount from '../ModalAccount';

export default async function Navbar() {
  const user = await getUserDetails();

  return (
    <div className='w-full text-white bg-[#031614]'>
      <div className={cn('max-w-6xl mx-auto flex justify-between items-center p-4')}>
        <Link href='/'>
          <div className='flex items-center gap-1'>
            <Image src='/logo.svg' className='size-6 ' width={50} height={50} alt='logo' />
            <p className='text-2xl not-italic font-bold leading-6'>GenAI</p>
          </div>
        </Link>

        <div className='hidden md:flex items-center gap-4'>
          {user ? (
            <>
              <ModalAccount user={user} />
              <SignOutButton />
            </>
          ) : (
            <ButtonCta label='Sign In' />
          )}
        </div>

        <Sheet>
          <SheetTrigger className='block md:hidden'>
            <HiBars3 />
          </SheetTrigger>
          <SheetContent className=''>
            <Link href='/' className='flex items-center gap-1 mb-10'>
              <Image src='/logo.svg' className='size-6 ' width={50} height={50} alt='logo' />
              <p className='text-2xl not-italic font-bold leading-6'>GenAI</p>
            </Link>

            {user ? (
              <div className='space-y-6'>
                <ModalAccount user={user} className='text-black font-medium' />
                <SignOutButton className='w-full' />
              </div>
            ) : (
              <ButtonCta label='Sign In' />
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
