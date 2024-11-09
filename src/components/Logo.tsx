// Logo Component that redirects users to the homepage.
// It is used across various parts of the application to provide a consistent way to return to the main page.

'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import Dark from '../assets/lottie/dark.json';
import Light from '../assets/lottie/light.json';

type AnimationData = typeof Dark;

export default function Logo() {
  // const [logoSrc, setLogoSrc] = useState<string>('/light-logo.png');
  // useEffect(() => {
  //   const src = isHomePage || theme === 'dark' ? '/light-logo.png' : '/dark-logo.png';
  //   setLogoSrc(src);
  // }, [isHomePage, theme]);

  const { theme } = useTheme();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [logoSrc, setLogoSrc] = useState<string>('');
  const [cameraSrc, setCameraSrc] = useState<AnimationData>();

  useEffect(() => {
    const src = isHomePage || theme === 'dark' ? 'text-white' : 'text-black';
    setLogoSrc(src);
  }, [isHomePage, theme]);

  useEffect(() => {
    const csrc = isHomePage || theme === 'dark' ? Dark : Light;
    setCameraSrc(csrc);
  }, [isHomePage, theme]);

  return (
    <Link href='/'>
      <div className='flex items-center gap-1 w-full justify-center'>
        {/* <Image src={logoSrc} width={150} height={128} alt='logo' /> */}
        {/* <Aperture color='#af40e2' /> */}
        <Lottie animationData={cameraSrc} className='w-9 h-9' />
        <h1 className={`text-2xl font-bold ${logoSrc}`}>PicAI</h1>
      </div>
    </Link>
  );
}
