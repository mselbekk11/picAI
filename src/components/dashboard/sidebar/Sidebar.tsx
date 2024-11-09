import Logo from '@/components/Logo';
import SidebarItem from './SidebarItem';
// import SidebarUpgradePlan from './SidebarUpgradePlan';
import ModalTrainModel from '@/components/dashboard/model/ModalTrainModel';
import { sidebarRoutes, bottomSidebarRoutes } from './content';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  return (
    <div className='bg-muted/40 h-full flex flex-col justify-between border-r'>
      <div>
        <div className='flex items-center justify-center p-4 h-14 gap-4 border-b lg:h-[60px] lg:px-6'>
          <Logo />
        </div>

        <div className='p-3'>
          <div className='mb-3'>
            <ModalTrainModel buttonText='Train Model' />
          </div>

          <div className='space-y-3'>
            {sidebarRoutes.map((route, index) => (
              <SidebarItem key={index} route={route} />
            ))}
          </div>
        </div>
      </div>

      <div className='space-y-3 p-3'>
        {/* <SidebarUpgradePlan /> */}
        {bottomSidebarRoutes.map((route, index) => (
          <SidebarItem key={index} route={route} />
        ))}
        {/* <DropdownAccount /> */}
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
