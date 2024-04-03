import InputWrapper from '@/components/InputWrapper';
import { SubmitButton } from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import openaiCreateContent from '@/utils/openai';
import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type TypesParams = {
  searchParams: { error: string };
};

export default async function Home({ searchParams }: TypesParams) {
  const supabase = supabaseServerClient();

  const { data } = await supabase
    .from('content_creations')
    .select()
    .order('created_at', { ascending: false });

  const createContentFn = async (formData: FormData) => {
    'use server';

    const topic = formData.get('topic') as string;
    const style = formData.get('style') as string;

    if (!topic || !style) {
      return redirect(`/preview?error=Required fields are missing.`);
    }

    const supabase = supabaseServerClient();
    const user = await getUserDetails();

    if (user == null) {
      return redirect(`/preview?error=Please login to create contents.`);
    }

    try {
      const response = await openaiCreateContent(topic, style);

      const { error } = await supabase.from('content_creations').insert({
        user_id: user.id,
        topic,
        style,
        results: response.outputs,
      });

      if (error) {
        throw new Error(error.message);
      }

      revalidatePath('/preview');
    } catch (error) {
      console.error(error);
      return redirect(`/preview?error=Generation failed. Please try again.`);
    }
  };

  const contents = data?.[0]?.results as { title: string; content: string }[];

  return (
    <div>
      <h1 className='text-2xl font-medium text-center mb-14'>AI Content Creator</h1>

      <form className='animate-in flex flex-col w-2/5 mx-auto justify-center gap-2 text-foreground'>
        <InputWrapper id='topic' label='Topic Name' className='mb-4'>
          <Input id='topic' name='topic' placeholder='What is new in AI?' />
        </InputWrapper>
        <InputWrapper id='style' label='Content Style' className='mb-4'>
          <Input id='style' name='style' placeholder='Educational, Facts, Opportunities' />
        </InputWrapper>

        <SubmitButton formAction={createContentFn}>Generate</SubmitButton>

        {searchParams?.error && (
          <p className='mt-4 py-2.5 bg-foreground/10 rounded text-xs text-red-700 text-center'>
            {searchParams.error}
          </p>
        )}
      </form>

      <div className='w-2/3 mx-auto flex flex-col justify-center gap-6 my-12'>
        {contents?.map((item, index) => (
          <div key={index}>
            <p className='text-center font-semibold mb-2'>{item.title}</p>
            <p className='text-sm text-justify'>{item?.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
