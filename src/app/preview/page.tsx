import InputWrapper from '@/components/InputWrapper';
import { SubmitButton } from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { imageModels } from './models';
import { startGeneration } from '@/utils/replicate';

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

    const model = formData.get('model') as string;
    const prompt = formData.get('prompt') as string;
    const negativePrompt = formData.get('neg-prompt') as string;
    const noOfOutputs = formData.get('no-of-outputs') as string;
    const guidance = formData.get('guidance') as string;
    const inference = formData.get('inference') as string;

    if (!prompt) {
      return redirect(`/preview?error=Please enter Image Description.`);
    }

    const supabase = supabaseServerClient();
    const user = await getUserDetails();

    if (user == null) {
      return redirect(`/preview?error=Please login to Generate Image.`);
    }

    const formattedNoOfOutputs = Number(noOfOutputs) ?? 1;
    const formattedGuidance = Number(guidance) ?? 7.5;
    const formattedInference = Number(inference) ?? 50;

    try {
      const predictionId = await startGeneration({
        modelVersion: model,
        prompt,
        negativePrompt,
        guidance: formattedNoOfOutputs,
        inference: formattedGuidance,
        noOfOutputs: formattedInference,
      });

      const { error } = await supabase.from('image_generations').insert({
        user_id: user.id,
        model,
        prompt,
        negative_prompt: negativePrompt,
        no_of_outputs: formattedNoOfOutputs.toString(),
        guidance: formattedGuidance.toString(),
        inference: formattedInference.toString(),
        prediction_id: predictionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error(`${error}`);
      return redirect(`/preview?error=${error}`);
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-medium text-center mb-14'>AI Image Generation</h1>

      <form className='animate-in flex flex-col w-2/5 mx-auto justify-center gap-2 text-foreground'>
        <InputWrapper label='Select Model' className='mb-4'>
          <Select name='model' defaultValue={imageModels[0].value}>
            <SelectTrigger className='w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {imageModels.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </InputWrapper>
        <InputWrapper id='prompt' label='Prompt' className='mb-4'>
          <Input id='prompt' name='prompt' placeholder='Image Prompt' />
        </InputWrapper>
        <InputWrapper id='neg-prompt' label='Negative Prompt' className='mb-4'>
          <Input id='neg-prompt' name='neg-prompt' placeholder='Negative Prompt' />
        </InputWrapper>

        <div className='flex gap-2 mb-6'>
          <InputWrapper id='no-of-outputs' label='Number of Outputs' description='(min: 1, max: 4)'>
            <Input min={1} max={4} id='no-of-outputs' name='no-of-outputs' defaultValue={1} />
          </InputWrapper>
          <InputWrapper id='guidance' label='Guidance' description='(min: 1, max: 50)'>
            <Input min={1} max={50} id='guidance' name='guidance' defaultValue={10} />
          </InputWrapper>
          <InputWrapper id='inference' label='Inference' description='(min: 1, max: 500)'>
            <Input min={1} max={500} id='inference' name='inference' defaultValue={50} />
          </InputWrapper>
        </div>

        <SubmitButton formAction={generateImageFn}>Generate</SubmitButton>

        {searchParams?.error && (
          <p className='mt-4 py-2.5 bg-foreground/10 rounded text-xs text-red-700 text-center'>
            {searchParams.error}
          </p>
        )}
      </form>

      <div className='w-3/4 mx-auto grid md:grid-cols-2 gap-3 my-12'>
        {data?.map(
          (item) =>
            item.image_urls && (
              <Image
                key={item.id}
                src={item.image_urls[0]}
                alt=''
                width={512}
                height={512}
                className='border rounded-md'
                placeholder='blur'
                blurDataURL={blurImageDataUrl}
              />
            )
        )}
      </div>
    </div>
  );
}
