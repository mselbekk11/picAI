const ImagesSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4'>
      {[...Array(8)].map((_, index) => (
        <div key={index} className='animate-pulse'>
          <div className='bg-gray-300 h-64 w-full rounded-lg'></div>
          <div className='mt-2 h-4 bg-gray-300 rounded w-3/4'></div>
        </div>
      ))}
    </div>
  );
};

export default ImagesSkeleton;
