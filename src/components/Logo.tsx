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
  const { theme, systemTheme } = useTheme();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Add mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string>('');
  const [cameraSrc, setCameraSrc] = useState<AnimationData>();

  // Handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Get the current theme, fallback to system theme if undefined
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const src = isHomePage || currentTheme === 'dark' ? 'text-white' : 'text-black';
    setLogoSrc(src);
  }, [isHomePage, theme, systemTheme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const csrc = isHomePage || currentTheme === 'dark' ? Dark : Light;
    setCameraSrc(csrc);
  }, [isHomePage, theme, systemTheme, mounted]);

  // Prevent wrong flash during hydration
  if (!mounted) {
    return null;
  }

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
