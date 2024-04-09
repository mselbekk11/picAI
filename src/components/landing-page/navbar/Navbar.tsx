import { cn } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HiBars3 } from 'react-icons/hi2';
<<<<<<<< HEAD:src/components/landing-page/Navbar.tsx
import ButtonCta from './ButtonCta';
========
import { getUserDetails } from '@/utils/supabase/server';
import ButtonCta from '../ButtonCta';
import SignOutButton from './SignOutButton';
>>>>>>>> 5e9f38392ac7721f7cc855d3df70e1946cfa1292:src/components/landing-page/navbar/Navbar.tsx

const NavbarRoutes = [
  { label: 'Features', url: '/#features' },
  { label: 'Products', url: '/#products' },
  { label: 'Testimonials', url: '/#testimonials' },
  { label: 'FAQ', url: '/#faq' },
];

export default async function Navbar() {
  return (
<<<<<<<< HEAD:src/components/landing-page/Navbar.tsx
    <div className='w-full text-white bg-[#031614]'>
========
    <div className='w-full text-white'>
>>>>>>>> 5e9f38392ac7721f7cc855d3df70e1946cfa1292:src/components/landing-page/navbar/Navbar.tsx
      <div className={cn('max-w-6xl mx-auto flex justify-between items-center p-4')}>
        <Link href='/'>
          <div className='flex items-center gap-1'>
            <Image src='/logo.svg' className='size-6 ' width={50} height={50} alt='logo' />
            <p className='text-2xl not-italic font-bold leading-6'>GenAI</p>
          </div>
        </Link>
        <ul className='hidden md:flex items-center gap-6'>
          {NavbarRoutes.map((item, index) => (
            <li key={index} className='text-sm cursor-pointer font-medium leading-6'>
              <Link href={item.url}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <ButtonCta label='Sign In' />

        <Sheet>
          <SheetTrigger className='block md:hidden'>
            <HiBars3 />
          </SheetTrigger>
          <SheetContent className=''>
            <div className='space-y-6'>
              <ul className='gap-6'>
                {NavbarRoutes.map((item, index) => (
                  <li key={index} className='text-sm cursor-pointer font-medium leading-6 py-2'>
                    <Link href={item.url}>{item.label}</Link>
                  </li>
                ))}
              </ul>
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
