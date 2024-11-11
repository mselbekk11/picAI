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
        <div className=''>
          <Skeleton className='h-[10px] w-[100px] rounded-md mb-2'></Skeleton>
          <Skeleton className='h-[20px] w-[200px] rounded-md'></Skeleton>
        </div>
      </Skeleton>
    </div>
  );
}
