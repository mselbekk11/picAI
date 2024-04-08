'use server';

import { startGeneration } from '@/utils/replicate';
import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';

export async function generateImageFn(formData: FormData) {
  const supabase = supabaseServerClient();
  const user = await getUserDetails();

  try {
    if (user == null) {
      throw new Error('Please login to Generate Images.');
    }

    const model = formData.get('model') as string;
    const prompt = formData.get('prompt') as string;
    const negativePrompt = formData.get('neg-prompt') as string;
    const noOfOutputs = formData.get('no-of-outputs') as string;
    const guidance = formData.get('guidance') as string;
    const inference = formData.get('inference') as string;

    if (!prompt) {
      throw new Error('Please enter prompt for the image.');
    }

    const formattedNoOfOutputs = Number(noOfOutputs) ?? 1;
    const formattedGuidance = Number(guidance) ?? 7.5;
    const formattedInference = Number(inference) ?? 50;

    const predictionId = await startGeneration({
      modelVersion: model,
      prompt,
      negativePrompt,
      noOfOutputs: formattedNoOfOutputs,
      guidance: formattedGuidance,
      inference: formattedInference,
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

    return predictionId;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
