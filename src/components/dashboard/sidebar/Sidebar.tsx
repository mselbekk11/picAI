import Logo from '@/components/Logo';
import SidebarItem from './SidebarItem';
import DropdownAccount from './DropdownAccount';
// import SidebarUpgradePlan from './SidebarUpgradePlan';
import ModalTrainModel from '@/components/dashboard/model/ModalTrainModel';
import { sidebarRoutes, bottomSidebarRoutes } from './content';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  return (
    <div className='h-full px-4 pb-4 flex flex-col justify-between border-r'>
      <div>
        <div className='my-6'>
          <Logo />
        </div>

        <div className='mb-3'>
          <ModalTrainModel buttonText='Train Model' />
        </div>

        <div className='space-y-1'>
          {sidebarRoutes.map((route, index) => (
            <SidebarItem key={index} route={route} />
          ))}
        </div>
      </div>

      <div className='space-y-3'>
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
