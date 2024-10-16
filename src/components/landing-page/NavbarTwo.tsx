import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import { Button } from '../ui/button';
import ButtonCta from './ButtonCta';
import Logo from '../Logo';

// import Drawer from 'react-modern-drawer';
// import ContactForm from './ContactForm';
// import React from 'react';

export default function NavbarTwo() {
  const navigation = [
    { name: 'Services', href: '/#services' },
    { name: 'Work', href: '/#showcase' },
    { name: 'FAQ', href: '/#faq' },
  ];

  // const [isOpen, setIsOpen] = React.useState(false);
  // const toggleDrawer = () => {
  //   setIsOpen((prevState) => !prevState);
  // };

  return (
    <header className='w-full bg-[#000] sticky top-0 z-50'>
      <nav className=' mx-auto max-w-7xl flex justify-between py-4 px-4 items-center'>
        <div className='min-w-[120px]'>
          {/* <Image src='/logo_black.png' alt='logo' width='35' height='100' /> */}
          {/* <p className='text-2xl font-bold text-[#af40e2]'>PicAi</p> */}
          <Logo />
        </div>
        <div className='flex lg:hidden'>
          <MobileMenu />
        </div>
        <div className='hidden lg:flex gap-x-12'>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className='text-base font-semibold text-white hover:text-[#215DFF]'>
              {item.name}
            </Link>
          ))}
        </div>
        <div className='hidden lg:flex min-w-[120px]'>
          <ButtonCta className='w-full' label='Sign In' />

          {/* <Drawer
            open={isOpen}
            size='40vw'
            onClose={toggleDrawer}
            direction='right'
            className='hidden lg:block'
          >
            <ContactForm />
          </Drawer> */}
          {/* <ButtonOne text='Contact Now'  /> */}
        </div>
      </nav>
    </header>
  );
}
