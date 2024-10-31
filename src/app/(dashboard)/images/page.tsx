import { supabaseServerClient } from '@/utils/supabase/server';
import EmptyState from '@/assets/images/profile.png';
import Image from 'next/image';
import ModalGeneratedImage from '@/components/dashboard/generate/ModalGeneratedImage';
import NavTitle from '@/components/dashboard/Navbar/NavTitle';

const Images = async () => {
  const supabase = await supabaseServerClient();

  // Get all the previously generated models from the database
  const { data: generations } = await supabase
    .from('headshot_generations')
    .select()
    .order('created_at', { ascending: false })
    .not('image_urls', 'is', null);

  return (
    <div className='flex flex-col p-6'>
      {generations && generations.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4'>
          {generations.map((generation) => (
            <div key={generation.id} className="contents">
              {generation.image_urls?.map((imageUrl, index) => (
                <ModalGeneratedImage 
                  key={`${generation.id}-${index}`} 
                  index={index} 
                  generation={generation} 
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center h-[calc(100vh-88px)]'>
          <Image src={EmptyState} alt='Empty-state' height={330} width={347} className='mb-2' />
          <p className='text-center text-lg font-semibold text-default'>No Generations Found</p>
        </div>
      )}
    </div>
  );
};

export default Images;
