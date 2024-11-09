// This component is used to switch between light and dark themes.
// It uses the next-themes package to switch between themes.
// The component uses the useTheme hook to get the current theme and setTheme to switch between themes.

'use client';

import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';

export function SelectThemeTwo() {
  const { theme, setTheme } = useTheme();

  // Set the theme to the opposite of the current theme between light and dark
  const handleThemeChange = () => {
    const selectedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(selectedTheme);
  };

  return <Switch onClick={handleThemeChange} />;
}
