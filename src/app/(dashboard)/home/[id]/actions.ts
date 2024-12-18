// This server-side function manages the submission of user inputs for AI-generated headshots.
// It requires user authentication and checks for necessary form fields before sending the data.
// FormData is used to append user prompts and configure the request, which is then sent to an external API.

'use server';

import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import axios from 'axios';

const ASTRIA_BASEURL = 'https://api.astria.ai';
// const FLUX1_DEV_TUNE_ID = '1743558'; // Hardcoded tune ID for Flux1.Dev
const API_KEY = process.env.ASTRIA_API_KEY;

// This function is used to train images based on the fine tuned model and user prompts.
export async function generateHeadshotFn(
  modelId: string,
  formData: FormData
): Promise<{ id: string } | { error: string }> {
  console.log('Starting generateHeadshotFn');
  console.log('modelId:', modelId);
  console.log('formData:', Object.fromEntries(formData.entries()));

  try {
    const supabase = await supabaseServerClient();
    const user = await getUserDetails();

    if (!user) {
      console.log('User not authenticated');
      return { error: 'Please login to Generate Images.' };
    }

    const prompt = formData.get('prompt') as string;

    // Check if the prompt is empty. If it is, throw an error.
    if (!prompt) {
      throw new Error('Image Description is required');
    }

    const form = new FormData();
    form.append('prompt[text]', prompt);
    form.append('prompt[super_resolution]', 'true');
    form.append('prompt[face_correct]', 'true');

    // Use the hardcoded origin instead of trying to get it from headers
    // const origin = 'https://09bb-2601-640-8001-b470-9199-dc5a-3f8d-73ab.ngrok-free.app';
    const origin = 'https://www.picai.so';

    // Creating webhook URL for the Astria Api to send a POST request after the image generation is complete
    const webhookUrl = `${origin}/api/webhooks/generate-images?user_id=${user.id}`;
    form.append('prompt[callback]', webhookUrl);

    // Check and deduct credits
    const { data: credits, error: creditsError } = await supabase
      .from('user_credits')
      .select('image_credits')
      .eq('user_id', user.id)
      .single();

    if (creditsError || !credits || credits.image_credits < 1) {
      return { error: 'Insufficient image credits' };
    }

    // Deduct 1 image credit
    const { data: deducted, error: deductError } = await supabase.rpc('deduct_image_credit', {
      user_id: user.id,
    });

    if (deductError) {
      console.error('Failed to deduct image credits:', deductError);
      return { error: 'Failed to deduct image credits' };
    }

    if (deducted === false) {
      return { error: 'Insufficient credits' };
    }

    try {
      const { data: generation } = await axios.post(`${ASTRIA_BASEURL}/tunes/${modelId}/prompts`, form, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Astria API response:', generation);

      console.log('Before Supabase insert');
      const { data, error } = await supabase
        .from('headshot_generations')
        .insert({
          user_id: user.id,
          prompt,
          model_id: modelId,
          generation_id: generation.id,
        })
        .select('id')
        .single();
      console.log('After Supabase insert, data:', data, 'error:', error);

      if (error) {
        console.error('Supabase error:', error);
        return { error: error.message };
      }

      if (!data || !data.id) {
        console.error('No data or id returned from Supabase');
        return { error: 'Failed to generate headshot: No generation ID received' };
      }

      console.log('Successful generation, returning:', { id: data.id });
      return { id: data.id };
    } catch (error: any) {
      console.error('Astria API error:', error.response?.data || error.message);
      return { error: error.response?.data?.message || 'Failed to generate headshot' };
    }
  } catch (error: any) {
    console.error('Error in generateHeadshotFn:', error);
    return { error: error.message || 'An unexpected error occurred' };
  } finally {
    console.log('generateHeadshotFn completed');
  }
}
