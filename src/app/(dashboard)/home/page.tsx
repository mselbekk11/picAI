import React from 'react';
import ModalTrainModel from '@/components/dashboard/model/ModalTrainModel';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabaseServerClient } from '@/utils/supabase/server';
import { cn, sentenceCase } from '@/utils/utils';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import ModalLimitExceeded from '@/components/dashboard/generate/ModalLimitExceeded';
import { Button } from '@/components/ui/button';
import DeleteModalButton from '@/components/dashboard/generate/DeleteModalButton';
import { LuLoader } from 'react-icons/lu';
import { Plus } from 'lucide-react';

const Models = async () => {
  const supabase = await supabaseServerClient();

  // Get the current user's session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return null; // or handle the no-user case appropriately
  }

  // Get all models belonging to the current user
  const { data: models } = await supabase
    .from('headshot_models')
    .select()
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className='flex flex-col p-6 pb-24 md:pb-6'>
      {models && models.length > 0 ? (
        <>
          <ModalLimitExceeded isModalOpen={models?.length >= 1000} />

          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
              {/* Display the generated models with status */}
              {models.map((model) => (
                <Card key={model.id} className='border relative'>
                  <CardContent className='p-0'>
                    <Link href={`/home/${model.model_id}`}>
                      <Image
                        src={model.images[0]}
                        alt=''
                        width={320}
                        height={450}
                        className='w-full h-[188px] object-cover rounded-t-lg'
                      />
                    </Link>

                    <div className='flex flex-col'>
                      <CardHeader>
                        <CardTitle className='pb-2 text-sm md:text-base'>
                          {sentenceCase(model.name)}
                        </CardTitle>
                        <div className='text-sm flex justify-between mb-1 '>
                          <Badge
                            variant='green'
                            className={cn(
                              'capitalize absolute top-4 left-4 rounded-lg flex items-center gap-1',
                              model.status === 'processing' && 'bg-[#af40e2] text-white'
                            )}>
                            {model.status === 'processing' && (
                              <LuLoader className='animate-[spin_3s_linear_infinite] text-center' size={12} />
                            )}
                            {model.status}
                          </Badge>
                        </div>
                        {model.status === 'processing' ? (
                          <Badge variant='secondary' className='w-fit text-xs font-normal mt-2'>
                            Model ready: {formatDistanceToNow(model.eta)}
                          </Badge>
                        ) : (
                          <div className='grid grid-cols-2 gap-2'>
                            <Link href={`/home/${model.model_id}`}>
                              <Button variant='secondary' size='sm' className='w-full'>
                                {/* <Eye size={12} className='mr-1' /> */}
                                View
                              </Button>
                            </Link>
                            <DeleteModalButton modelId={model.model_id} />
                          </div>
                        )}
                      </CardHeader>
                      {/* <p className='text-lg font-semibold text-default mb-2'>{sentenceCase(model.name)}</p> */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* Sticky bottom nav for mobile */}
          <div className='fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden'>
            <Link href='/train-model'>
              <Button size='lg' className='w-full'>
                <Plus className='mr-2' /> Train Model
              </Button>
            </Link>
          </div>
        </>
      ) : (
        // Button (modal) to generate a new model if no models are found
        <div className='flex flex-col items-center justify-center h-[calc(100vh-88px)] max-w-lg mx-auto'>
          <p className='text-lg text-default text-center font-medium px-4 mb-7'>
            Get started by training your first model.
          </p>
          {/* <ModalTrainModel /> */}
          <Link href='/train-model'>
            <Button size='lg' className='w-full'>
              <Plus className='mr-2' /> Train Model
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Models;
