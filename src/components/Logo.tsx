import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/'>
      <div className='flex items-center gap-1'>
        {/* <Image src='/logo.svg' className='size-6 ' width={50} height={50} alt='logo' /> */}
        <p className='text-2xl not-italic font-bold leading-6'>BuilderKit</p>
      </div>
    </Link>
  );
}
