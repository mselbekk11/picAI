'use server';

import { startGeneration } from '@/utils/replicate';
import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';

export async function generateQrCodeFn(formData: FormData) {
  const supabase = supabaseServerClient();
  const user = await getUserDetails();

  try {
    if (user == null) {
      throw 'Please login to Generate Qr Code.';
    }

    const url = formData.get('url') as string;
    const prompt = formData.get('prompt') as string;

    if (!prompt || !url) {
      throw 'Missing required fields.';
    }

    // const startTime = performance.now();
    const imageUrl = await startGeneration(url, prompt);
    // const endTime = performance.now();
    // const durationMS = endTime - startTime;
    // console.log(durationMS);

    const { data, error } = await supabase
      .from('qr_code_generations')
      .insert({
        user_id: user.id,
        url,
        prompt,
        image_url: imageUrl,
      })
      .select()
      .single();

    if (error) {
      throw error.message;
    }

    return data;
  } catch (error) {
    return `${error}`;
  }
}
