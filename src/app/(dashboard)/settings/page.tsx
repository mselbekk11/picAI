import { SelectTheme } from '@/components/dashboard/Navbar/SelectTheme';
import { getUserDetails } from '@/utils/supabase/server';

const Settings = async () => {
  const user = await getUserDetails();
  return (
    <div className='mt-2'>
      <div className='flex flex-col'>
        <div className='mb-4'>
          <p className='text-sm'>Display Name: </p>
          <p className='text-lg font-medium'>{user?.user_metadata?.full_name}</p>
        </div>
        <div className='mb-4'>
          <p className='text-sm'>Email Address: </p>
          <p className='text-lg font-medium'>{user?.email}</p>
        </div>
        <div className='mb-4'>
          <p className='text-sm'>Current Plan: </p>
          <p className='text-lg font-medium'>Free</p>
        </div>
        <div className='mb-4'>
          <p className='text-sm'>Theme: </p>
          <SelectTheme />
        </div>
      </div>
    </div>
  );
};

export default Settings;
