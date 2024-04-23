// This main component fetches and displays a list of headshot models previously generated from the database.
// The UI is conditionally rendered based on whether any models are returned from the database.
// The 'ModalTrainModel' component is used to provide a UI element for initiating the training of new models.
// Each model is displayed in a 'Card' component, with a link to a detailed view.

import { supabaseServerClient } from '@/utils/supabase/server';
import { FaImages } from 'react-icons/fa';
import ModalTrainModel from '@/components/generate/ModalTrainModel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { cn, sentenceCase } from '@/utils/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default async function TrainModel() {
  const supabase = supabaseServerClient();

  // Get all the previously generated models from the database
  const { data: models } = await supabase
    .from('headshot_models')
    .select()
    .order('created_at', { ascending: false });

  return (
    <div className='max-w-6xl mx-auto pt-14'>
      {models && models.length > 0 ? (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row gap-4 w-full justify-between items-center text-center'>
            <h1 className='text-2xl font-semibold text-white'>Your models</h1>
            {/* Button (modal) to generate a new model */}
            <ModalTrainModel buttonText='Train New Model' />
          </div>

          <div className='flex gap-6'>
            {/* Display the generated models with status */}
            {models.map((model) => (
              <Card key={model.id} className='border dark:border-gray-500/30'>
                <CardContent className='p-2'>
                  <Link href={`/generate/${model.model_id}`}>
                    <Image
                      src={model.images[0]}
                      alt=''
                      width={320}
                      height={450}
                      className='w-80 h-[400px] object-cover rounded-md'
                    />
                  </Link>

                  <div className='flex flex-col gap-4 p-2 mt-2'>
                    <p className='text-lg font-semibold'>{sentenceCase(model.name)}</p>
                    <div className='text-sm flex justify-between'>
                      <div className='flex gap-2'>
                        <span className='capitalize'>{model.type}</span>
                        <span>-</span>
                        <span>{model.images.length} Image</span>
                      </div>
                      <Badge
                        variant='blue'
                        className={cn('capitalize', model.status === 'processing' && 'bg-orange-400')}>
                        {model.status}
                      </Badge>
                    </div>
                    {model.status === 'processing' ? (
                      <Badge variant='secondary' className='w-fit text-xs font-normal mt-2'>
                        Getting your model ready {formatDistanceToNow(model.eta)}
                      </Badge>
                    ) : (
                      <div className='text-sm'>
                        <p>
                          <span className='font-medium opacity-60 mr-2'>Trained:</span>
                          {formatDistanceToNow(model.trained_at!)}
                        </p>
                        <p>
                          <span className='font-medium opacity-60 mr-2'>Expires:</span>
                          {formatDistanceToNow(model.expires_at!)}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        // Button (modal) to generate a new model if no models are found
        <div className='flex flex-col gap-4 items-center'>
          <FaImages size={64} className='text-gray-500' />
          <h1 className='text-2xl text-center px-4 mb-4'>Get started by training your first model.</h1>
          <ModalTrainModel />
        </div>
      )}
    </div>
  );
}
