// import { RiLayoutGridFill } from 'react-icons/ri';
// import { MdHistory } from 'react-icons/md';
import { House } from 'lucide-react';
import { Image } from 'lucide-react';
import { Settings } from 'lucide-react';
import { CreditCard } from 'lucide-react';

// <Eye size={12} className='mr-1' />

export const sidebarRoutes = [
  {
    // icon: <RiLayoutGridFill className='size-5' />,
    icon: <House size={14} />,
    label: 'Home',
    path: '/home',
  },
  {
    icon: <Image size={14} />,
    label: 'Images',
    path: '/images',
  },
];

export const bottomSidebarRoutes = [
  {
    icon: <CreditCard size={14} />,
    label: 'Billing',
    path: '/billing',
  },
  {
    icon: <Settings size={14} />,
    label: 'Account Settings',
    path: '/settings',
  },
];
