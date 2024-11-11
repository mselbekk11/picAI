'use client';

import { SheetClose } from '@/components/ui/sheet';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode } from 'react';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

interface MobileSidebarItemProps {
  route: {
    icon: ReactNode;
    label: string;
    path: string;
  };
}

const MobileSidebarItem: FC<MobileSidebarItemProps> = ({ route }) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(route.path);

  return (
    <SheetClose asChild>
      <Link
        href={route.path}
        className={cn(
          'w-full h-10 flex items-center gap-2 px-4 py-2 text-sm font-medium border border-transparent hover:border-border rounded-lg text-subtle tracking-tight',
          isActive && 'border-border !text-default bg-secondary'
        )}>
        <div className=''>{route.icon}</div>
        <span className={cn(inter.className, '')}>{route.label}</span>
      </Link>
    </SheetClose>
  );
};

export default MobileSidebarItem;
