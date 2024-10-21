// Logo Component that redirects users to the homepage.
// It is used across various parts of the application to provide a consistent way to return to the main page.

'use client';

import Link from 'next/link';

import Lottie from 'lottie-react';
import Camera from '../assets/lottie/photo.json';

export default function LogoHomepage() {
  return (
    <Link href='/'>
      <div className='flex items-center gap-1 w-full justify-center'>
        {/* <Aperture color='#af40e2' /> */}
        <Lottie animationData={Camera} className='w-9 h-9' />
        <h1 className='text-2xl font-bold text-white'>PicAI</h1>
      </div>
    </Link>
  );
}
