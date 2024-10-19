// Logo Component that redirects users to the homepage.
// It is used across various parts of the application to provide a consistent way to return to the main page.

'use client';

import Link from 'next/link';

import { Aperture } from 'lucide-react';

export default function LogoHomepage() {
  return (
    <Link href='/'>
      <div className='flex items-center gap-2 w-full justify-center'>
        <Aperture color='#af40e2' />
        <h1 className='text-2xl font-bold text-white'>PicAI</h1>
      </div>
    </Link>
  );
}
