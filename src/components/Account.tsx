import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getUserDetails } from '@/utils/supabase/server';
import { Button } from './ui/button';
import { MdArrowOutward } from 'react-icons/md';

export default async function Account() {
  const user = await getUserDetails();
  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-center text-xl'>Account Settings</DialogTitle>
      </DialogHeader>
      <hr className='my-5 text-gray-600' />
      <div className='space-y-6'>
        <div className='flex justify-between items-center'>
          <p className='text-[#70747B] font-medium'>Display Name</p>
          <p className='text-[#3E3E3E] font-semibold text-end'>
            {user?.identities?.[0]?.identity_data?.full_name ?? ''}
          </p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-[#70747B] font-medium'>Email Address</p>
          <p className='text-[#3E3E3E] font-semibold text-end'>{user.email ?? ''}</p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-[#70747B] font-medium'>Available Credits</p>
          <p className='text-[#3E3E3E] font-semibold text-end'>{'24'}</p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-[#70747B] font-medium'>Current Plan</p>
          <p className='text-[#3E3E3E] font-semibold text-end'>{'Free'}</p>
        </div>
        <Button className='rounded-lg w-full flex border border-[#51DCA3] green-btn-gradient gap-2'>
          Upgrade Plan <MdArrowOutward size={16} />
        </Button>
      </div>
    </>
  );
}
