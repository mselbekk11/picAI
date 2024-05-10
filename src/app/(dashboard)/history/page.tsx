import { supabaseServerClient } from '@/utils/supabase/server';
import React from 'react';
import EmptyState from '../../../assets/images/profile.png';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { sentenceCase } from '@/utils/utils';

const page = async () => {
  const supabase = supabaseServerClient();

  // Get all the previously generated models from the database
  const { data: generations } = await supabase
    .from('headshot_generations')
    .select()
    .order('created_at', { ascending: false })
    .not('image_urls', 'is', null);

  return (
    <div>
      {generations && generations.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {generations.map((generation) => (
            <Card key={generation.id} className='border border-light dark:border-gray-500/10 relative'>
              <CardContent className='p-2'>
                <Link href={`/home/${generation.model_id}/${generation.id}`}>
                  <Image
                    src={generation.image_urls?.[0] ?? ''}
                    alt=''
                    width={320}
                    height={450}
                    className='w-full h-[188px] object-cover rounded-md'
                  />
                </Link>
                <p className='font-semibold text-grey dark:text-white mt-2'>{sentenceCase(generation.prompt)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center h-[calc(100vh-85px)]'>
          <Image src={EmptyState} alt='Empty-state' height={347} width={347} />
          <p className='text-center text-lg font-semibold text-gray-500'>No Generations Found</p>
        </div>
      )}
    </div>
  );
};

export default page;
