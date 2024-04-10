import { cn } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import ButtonCta from '../landing-page/ButtonCta';
import SignOutButton from './SignOutButton';
import { getUserDetails } from '@/utils/supabase/server';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
import Account from '../Account';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

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
              <Dialog>
                <DialogTrigger className='text-white hover:no-underline'>Account Setting</DialogTrigger>
                <DialogContent>
                  <Account />
                </DialogContent>
              </Dialog>
              <SignOutButton />
            </>
          ) : (
            <ButtonCta label='Sign In' />
          )}
        </div>

        {/* TODO: handle for mobile responsiveness */}
        <Sheet>
          <SheetTrigger className='block md:hidden'>
            <HiBars3 />
          </SheetTrigger>
          <SheetContent className=''>
            <div className='space-y-6'>
              <Link href='/'>
                <div className='flex items-center gap-1'>
                  <Image src='/logo.svg' className='size-6 ' width={50} height={50} alt='logo' />
                  <p className='text-2xl not-italic font-bold leading-6'>GenAI</p>
                </div>
              </Link>
              <Dialog>
                <DialogTrigger className='text-black hover:no-underline'>Account Setting</DialogTrigger>
                <DialogContent>
                  <Account />
                </DialogContent>
              </Dialog>
              <Button className='rounded-lg w-full flex border border-[#51DCA3] green-btn-gradient'>
                Sign Up
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
