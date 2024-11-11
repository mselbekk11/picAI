import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { FaBars } from 'react-icons/fa6';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { sidebarRoutes, bottomSidebarRoutes } from './content';
import MobileSidebarItem from './MobileSidebarItem';
import LogoutButton from './LogoutButton';
import { Plus } from 'lucide-react';

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className='hover:opacity-75 transition flex'>
        <FaBars />
      </SheetTrigger>
      <SheetContent side='left' className='p-5 pt-8'>
        <div className='h-full flex flex-col justify-between'>
          <div>
            <div className='mb-6'>
              <Logo />
            </div>
            <SheetClose asChild className='w-full'>
              <Link href='/train-model'>
                <Button size='lg' className='w-full mb-3'>
                  <Plus className='mr-2' /> Train Model
                </Button>
              </Link>
            </SheetClose>

            {/* <ModalTrainModel buttonText='Train Model' /> */}

            <div className='space-y-1'>
              {sidebarRoutes.map((route, index) => (
                <MobileSidebarItem key={index} route={route} />
              ))}
            </div>
          </div>

          <div className='space-y-3'>
            {bottomSidebarRoutes.map((route, index) => (
              <MobileSidebarItem key={index} route={route} />
            ))}

            <LogoutButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
