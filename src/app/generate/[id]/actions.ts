'use server';

import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import axios from 'axios';
import { headers } from 'next/headers';

const ASTRIA_BASEURL = 'https://api.astria.ai';
const API_KEY = process.env.ASTRIA_API_KEY;

export async function generateHeadshotFn(modelId: string, formData: FormData) {
  const supabase = supabaseServerClient();
  const user = await getUserDetails();

  const origin = headers().get('origin');

  try {
    if (user == null) {
      throw 'Please login to Generate Images.';
    }

    const prompt = formData.get('prompt') as string;
    const negativePrompt = formData.get('neg-prompt') as string;

    if (!prompt) {
      throw 'Image Description is required';
    }

    const form = new FormData();
    form.append('prompt[text]', prompt);
    form.append('prompt[negative_prompt]', negativePrompt);
    form.append('prompt[super_resolution]', 'true');
    form.append('prompt[face_correct]', 'true');

    const webhookUrl = `${origin}/webhooks/generate-images?user_id=${user.id}`;
    form.append('prompt[callback]', webhookUrl);

    const { data: generation } = await axios.post(`${ASTRIA_BASEURL}/tunes/${modelId}/prompts`, form, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const { data, error } = await supabase
      .from('headshot_generations')
      .insert({
        user_id: user.id,
        prompt,
        negative_prompt: negativePrompt,
        model_id: modelId,
        generation_id: generation.id,
      })
      .select('id')
      .single();

    if (error) {
      throw error.message;
    }

    return { id: data.id };
  } catch (error) {
    console.error(error);
    return `${error}`;
  }
}
