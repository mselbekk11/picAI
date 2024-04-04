import Link from 'next/link';

export default async function Home() {
  return (
    <div>
      <h1 className='text-lg font-medium text-center mb-6'>AI Image Generation Landing Page</h1>

      <div className='flex justify-center text-sm'>
        <Link href='/preview' className='underline'>
          Preview
        </Link>
      </div>
    </div>
  );
}
