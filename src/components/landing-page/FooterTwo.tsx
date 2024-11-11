import Link from 'next/link';

export default function FooterTwo() {
  return (
    <div className='flex justify-between w-full max-w-6xl mx-auto pb-12 px-4'>
      <div className='text-white'>
        Made with 💙 by{' '}
        <a href='https://x.com/mselbekk1' target='_blank' rel='noopener noreferrer'>
          <span className='decoration-1 decoration-white underline'>Morgan</span>
        </a>
      </div>
      <div className='flex'>
        <div className='text-white decoration-1 decoration-white underline'>
          <Link href='/terms-of-service'>Terms of Service</Link>
        </div>
        <div className='text-white mx-2'>|</div>
        <div className='text-white decoration-1 decoration-white underline'>
          <Link href='/privacy-policy'>Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
