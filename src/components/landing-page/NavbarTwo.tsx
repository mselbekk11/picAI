import Link from 'next/link';
import MobileMenu from './MobileMenu';
import ButtonCta from './ButtonCta';

import { Inter } from 'next/font/google';
import LogoHomepage from '../LogoHomepage';
const inter = Inter({ subsets: ['latin'] });

export default function NavbarTwo() {
  const navigation = [
    { name: 'How it Works', href: '/#howitworks' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQ', href: '/#faq' },
  ];

  // const [isOpen, setIsOpen] = React.useState(false);
  // const toggleDrawer = () => {
  //   setIsOpen((prevState) => !prevState);
  // };

  return (
    <header className='w-full bg-black sticky top-0 z-50'>
      <nav className='mx-auto max-w-7xl flex justify-between py-4 px-4 items-center'>
        <div className='min-w-[120px]'>
          <LogoHomepage />
        </div>
        <div className='flex lg:hidden'>
          <MobileMenu />
        </div>
        {/* Move the navigation links and sign-in button to the right */}
        <div className='hidden lg:flex items-center gap-x-8'>
          <div className='flex gap-x-8'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold text-white hover:text-[#ccc] ${inter.className}`}>
                {item.name}
              </Link>
            ))}
          </div>
          <ButtonCta className='w-auto' label='Sign In' />
        </div>
      </nav>
    </header>
  );
}
