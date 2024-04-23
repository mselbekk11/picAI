// This component is responsible for generating headshots based on a specific model.
// It fetches model details and associated generation history from the database using the model ID.
// The 'FormInput' component is then used to allow users to input positive & negative prompts and initiate new generations.
// It is designed to respond dynamically to the 'id' parameter in the URL path, which represents the model ID.

import FormInput from '@/components/generate/images/FormInput';
import { supabaseServerClient } from '@/utils/supabase/server';

export default async function GenerateImage({ params }: { params: { id: string } }) {
  const supabase = supabaseServerClient();

  const { data: model } = await supabase.from('headshot_models').select().eq('model_id', params.id).single();
  const { data: generations } = await supabase
    .from('headshot_generations')
    .select()
    .eq('model_id', params.id)
    .not('image_urls', 'is', null)
    .order('created_at', { ascending: false });

  if (model == null) {
    return <p className='text-center mt-10'>Model not found.</p>;
  }

  return (
    <div className='max-w-6xl mx-auto pt-14'>
      <FormInput model={model} generations={generations!} />
    </div>
  );
}
