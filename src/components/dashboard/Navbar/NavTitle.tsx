'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface NavTitleProps {}

const NavTitle: FC<NavTitleProps> = () => {
  const pathname = usePathname();

  const title =
    pathname === '/home'
      ? 'Models'
      : pathname === '/history'
        ? 'Images'
        : pathname === '/pricing'
          ? 'Pricing'
          : pathname === '/settings'
            ? 'Account Settings'
            : 'Headshot Generator';

  return <div className='text-lg font-semibold text-default'>{title}</div>;
};

export default NavTitle;
