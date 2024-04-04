import EmailAuth from '@/components/login/EmailAuth';
import GoogleAuth from '@/components/login/GoogleAuth';

type TypeParams = {
  searchParams: { error: string };
};

export default function Login({ searchParams }: TypeParams) {
  return (
    <div className='min-h-screen flex flex-col items-center'>
      <h1 className='text-2xl font-medium mb-10'>Login to AI Image Generation</h1>

      <div className='w-full sm:max-w-md flex flex-col gap-6 items-center'>
        <GoogleAuth />
        <hr className='w-full' />
        <EmailAuth searchParams={searchParams} />
      </div>
    </div>
  );
}
