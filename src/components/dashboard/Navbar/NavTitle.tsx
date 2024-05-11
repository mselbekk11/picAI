'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface NavTitleProps {}

const NavTitle: FC<NavTitleProps> = () => {
  const pathname = usePathname();

  const title =
    pathname === '/home'
      ? 'Headshot Generator'
      : pathname === '/history'
        ? 'History'
        : pathname === '/pricing'
          ? 'Pricing'
          : 'Headshot Generator';

  return <div className='text-lg font-semibold text-grey dark:text-white'>{title}</div>;
};

export default NavTitle;
