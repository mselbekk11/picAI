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
