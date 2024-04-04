import InputWrapper from '@/components/InputWrapper';
import { SubmitButton } from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import openaiGenerateImage from '@/utils/openai';
import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import { redirect } from 'next/navigation';

type TypesParams = {
  searchParams: { error: string };
};

const blurImageDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEXSURBVHgBVZDPSsNAEMa//dP8WVOheFToJejBKh7E4hMIXn0FwcfwrQSvPoFevFQUIdrE0NBTXRPTcbJrxc4yLHzz229nRtzd3lCy2YdJ+og5oyiG1hpSKwhICAEXWrGgdYBeEPLdg1TKp5AOEL8kaxqqc+Ci4tr8PcP11SUuzs/+IO/YAdq70HeLx4d7JIMBtmyNpq4RhKEHheQ+GArDCDGL6f4I6egQL08TlHmO7eHQg0RLgLgHfmCbBvOiwPQtg+2K/NMqZFM3WLYtiAgbxiCvKuzs7kGsBmETZ0RuIp6CtS+7wPHJGCaKYGLTkcz4o4/Gp8wIB05fn5FNuLfyA0VZIl0cwNpPtzZRzWYknDthPVj5J/0AA1VXn/cQBtkAAAAASUVORK5CYII=';

export default async function Home({ searchParams }: TypesParams) {
  const supabase = supabaseServerClient();

  const { data } = await supabase
    .from('image_generations')
    .select()
    .order('created_at', { ascending: false });

  const generateImageFn = async (formData: FormData) => {
    'use server';

    const imageDescription = formData.get('image-description') as string;

    if (!imageDescription) {
      return redirect(`/preview?error=Please enter Image Description.`);
    }

    const supabase = supabaseServerClient();
    const user = await getUserDetails();

    if (user == null) {
      return redirect(`/preview?error=Please login to Generate Image.`);
    }

    try {
      const imageResponse = await openaiGenerateImage(imageDescription);

      const { error } = await supabase.from('image_generations').insert({
        user_id: user.id,
        image_description: imageDescription,
        image_url: imageResponse!,
      });

      if (error) {
        throw new Error(error.message);
      }

      revalidatePath('/preview');
    } catch (error) {
      console.error(`${error}`);
      return redirect(`/preview?error=${error}`);
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-medium text-center mb-14'>AI Image Generation</h1>

      <form className='animate-in flex flex-col w-2/5 mx-auto justify-center gap-2 text-foreground'>
        <InputWrapper id='image-description' label='Image Description' className='mb-4'>
          <Input
            id='image-description'
            name='image-description'
            placeholder='An image of a lion in anime style standing on top of a huge rock as a king.'
          />
        </InputWrapper>

        <SubmitButton formAction={generateImageFn}>Generate</SubmitButton>

        {searchParams?.error && (
          <p className='mt-4 py-2.5 bg-foreground/10 rounded text-xs text-red-700 text-center'>
            {searchParams.error}
          </p>
        )}
      </form>

      <div className='w-3/4 mx-auto grid md:grid-cols-2 gap-3 my-12'>
        {data?.map((item) => (
          <Image
            key={item.id}
            src={item.image_url}
            alt=''
            width={512}
            height={512}
            className='border rounded-md'
            placeholder='blur'
            blurDataURL={blurImageDataUrl}
          />
        ))}
      </div>
    </div>
  );
}
