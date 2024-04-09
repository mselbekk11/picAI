import { supabaseServerClient } from '@/utils/supabase/server';
import FormInput from '@/components/generate/FormInput';

export default async function Home() {
  const supabase = supabaseServerClient();

  const { data } = await supabase
    .from('qr_code_generations')
    .select()
    .order('created_at', { ascending: false })
    .not('image_url', 'is', null);

  return (
    <div className='max-w-6xl mx-auto pt-14'>
      <FormInput data={data!} />
    </div>
  );
}
