import { supabaseServerClient } from '@/utils/supabase/server';
import ModalGeneratedImage from '@/components/dashboard/generate/ModalGeneratedImage';

const Images = async () => {
  const supabase = await supabaseServerClient();

  // Get the current user's session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return null; // or handle the no-user case appropriately
  }

  // Get all the previously generated images for the current user
  const { data: generations } = await supabase
    .from('headshot_generations')
    .select()
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .not('image_urls', 'is', null);

  return (
    <div className='flex flex-col p-6'>
      {generations && generations.length > 0 ? (
        <div className='grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4'>
          {generations.map((generation) => (
            <div key={generation.id} className='contents'>
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
          {/* <Image src={EmptyState} alt='Empty-state' height={330} width={347} className='mb-2' /> */}
          <p className='text-center text-lg font-semibold text-default'>No Images Yet</p>
        </div>
      )}
    </div>
  );
};

export default Images;
