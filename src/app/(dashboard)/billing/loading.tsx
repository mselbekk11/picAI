import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingPage() {
  return (
    <div className='flex flex-col p-6'>
      <Skeleton className='rounded-md p-6'>
        <div className='mb-8'>
          <Skeleton className='h-[10px] w-[100px] rounded-md mb-2'></Skeleton>
          <Skeleton className='h-[20px] w-[200px] rounded-md'></Skeleton>
        </div>
        <div className='mb-8'>
          <Skeleton className='h-[10px] w-[100px] rounded-md mb-2'></Skeleton>
          <Skeleton className='h-[20px] w-[200px] rounded-md'></Skeleton>
        </div>
        <div className='mb-8'>
          <Skeleton className='h-[10px] w-[100px] rounded-md mb-2'></Skeleton>
          <Skeleton className='h-[20px] w-[200px] rounded-md'></Skeleton>
        </div>
        <div className='mb-8'>
          <Skeleton className='h-[10px] w-[100px] rounded-md mb-2'></Skeleton>
          <Skeleton className='h-[20px] w-[200px] rounded-md'></Skeleton>
        </div>
        <Skeleton className='lg:hidden h-[30px] w-full rounded-md'></Skeleton>
      </Skeleton>
      <Skeleton className='mx-auto my-6 w-[200px] h-[40px]'></Skeleton>
      <div className='mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 w-full'>
        <Skeleton className='rounded-md w-full p-6'>
          <Skeleton className='h-[20px] w-[200px] rounded-md mb-6'></Skeleton>
          <Skeleton className='h-[20px] w-[400px] rounded-md mb-8'></Skeleton>
          <Skeleton className='h-[50px] w-[100px] rounded-md mb-8'></Skeleton>
          <Skeleton className='h-[4px] w-full rounded-md mb-8'></Skeleton>
          <div className='flex gap-2 mb-6'>
            <Skeleton className='h-[20px] w-[30px] rounded-md'></Skeleton>
            <Skeleton className='h-[20px] w-[250px] rounded-md'></Skeleton>
          </div>
          <div className='flex gap-2 mb-6'>
            <Skeleton className='h-[20px] w-[30px] rounded-md'></Skeleton>
            <Skeleton className='h-[20px] w-[200px] rounded-md'></Skeleton>
          </div>
          <div className='flex gap-2 mb-6'>
            <Skeleton className='h-[20px] w-[30px] rounded-md'></Skeleton>
            <Skeleton className='h-[20px] w-[150px] rounded-md'></Skeleton>
          </div>
          <div className='flex gap-2'>
            <Skeleton className='h-[20px] w-[30px] rounded-md'></Skeleton>
            <Skeleton className='h-[20px] w-[200px] rounded-md'></Skeleton>
          </div>
        </Skeleton>

        <Skeleton className='rounded-md w-full p-6'>
          <Skeleton className='h-[20px] w-[200px] rounded-md mb-6'></Skeleton>
          <Skeleton className='h-[20px] w-[400px] rounded-md mb-8'></Skeleton>
          <Skeleton className='h-[50px] w-[100px] rounded-md mb-8'></Skeleton>
          <Skeleton className='h-[4px] w-full rounded-md mb-8'></Skeleton>
          <div className='flex gap-2 mb-6'>
            <Skeleton className='h-[20px] w-[30px] rounded-md'></Skeleton>
            <Skeleton className='h-[20px] w-[250px] rounded-md'></Skeleton>
          </div>
          <div className='flex gap-2 mb-6'>
            <Skeleton className='h-[20px] w-[30px] rounded-md'></Skeleton>
            <Skeleton className='h-[20px] w-[200px] rounded-md'></Skeleton>
          </div>
          <div className='flex gap-2 mb-6'>
            <Skeleton className='h-[20px] w-[30px] rounded-md'></Skeleton>
            <Skeleton className='h-[20px] w-[150px] rounded-md'></Skeleton>
          </div>
          <div className='flex gap-2'>
            <Skeleton className='h-[20px] w-[30px] rounded-md'></Skeleton>
            <Skeleton className='h-[20px] w-[200px] rounded-md'></Skeleton>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}
