import { SelectThemeTwo } from '@/components/dashboard/Navbar/SelectThemeTwo';
import { Card, CardContent } from '@/components/ui/card';
import { getUserDetails } from '@/utils/supabase/server';

const Settings = async () => {
  const user = await getUserDetails();
  return (
    <div className='flex flex-col p-6'>
      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col'>
            <div className='mb-4'>
              <p className='text-xs text-gray-400'>Display Name: </p>
              <p className='text-lg font-medium'>{user?.user_metadata?.full_name}</p>
            </div>
            <div className='mb-4'>
              <p className='text-xs text-gray-400'>Email Address: </p>
              <p className='text-lg font-medium'>{user?.email}</p>
            </div>
            <div className='mb-4'>
              <p className='text-xs text-gray-400'>Contact Support: </p>
              <p className='text-lg font-medium'>mselbekk11@gmail.com</p>
            </div>
            <div className='mb-4'>
              <p className='text-xs mb-2 text-gray-400'>Theme: </p>
              <SelectThemeTwo />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
