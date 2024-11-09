'use client';

import { Caveat as CaveatFont } from 'next/font/google';
const caveat = CaveatFont({ subsets: ['latin'] });
// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });

interface SectionTitleProps {
  loop: string;
  text: string;
  title: string;
}

export function SectionTitle({ loop, text, title }: SectionTitleProps) {
  return (
    <>
      <div className={`inline-block text-3xl font-semibold leading-6 text-[#af40e2] ${caveat.className}`}>
        {loop}
      </div>
      <h2 className='text-white text-2xl md:text-3xl font-semibold pt-6'>{title}</h2>
      {/* <p className={`text-base md:text-base text-gray-400 max-w-[500px] ${inter.className}`}>{text}</p> */}
    </>
  );
}
