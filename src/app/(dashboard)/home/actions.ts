// Server-side function to submit user-provided images for model finetuning.
// It requires user authentication and checks for necessary form fields before sending the data.
// The function constructs a FormData object for a POST request to the AI service's API, handling the response and database interactions.
// Errors are caught and returned, allowing for client-side handling.

'use server';

import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import axios from 'axios';

const ASTRIA_BASEURL = 'https://api.astria.ai';
const API_KEY = process.env.ASTRIA_API_KEY;

// This function is used for model finetuning based on user-provided images.
export async function finetuneModelFn(request: FormData) {
  const supabase = await supabaseServerClient();
  const user = await getUserDetails();

  // const origin = headers().get('origin');
  const origin = 'https://09bb-2601-640-8001-b470-9199-dc5a-3f8d-73ab.ngrok-free.app';

  try {
    if (user == null) {
      throw 'Please login to Generate a Headshot.';
    }

    const title = request.get('title') as string;
    const type = request.get('type') as string;
    const images = request.getAll('images');

    if (!title || !type) {
      throw 'Missing required fields.';
    }

    // Check and deduct credits
    const { data: credits, error: creditsError } = await supabase
      .from('user_credits')
      .select('model_credits')
      .single();

    if (creditsError || !credits || credits.model_credits < 1) {
      throw 'Insufficient model credits';
    }

    // Deduct 1 model credit
    const { data: deducted, error: deductError } = await supabase.rpc('deduct_model_credit', {
      user_id: user.id,
    });

    if (deductError) {
      console.error('Failed to deduct model credits:', deductError);
      throw 'Failed to deduct model credits';
    }

    if (deducted === false) {
      throw 'Insufficient credits';
    }

    const formData = new FormData();
    formData.append('tune[title]', title);
    formData.append('tune[base_tune_id]', '1504944');
    formData.append('tune[model_type]', 'lora');
    formData.append('tune[name]', type);
    formData.append('tune[token]', 'model');
    // Log form data
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    // Appending images to the FormData object
    images.forEach((file, index) => {
      formData.append(`tune[images][]`, file);
      if (typeof file === 'object' && 'name' in file) {
        console.log(`Image ${index + 1}: ${file.name}`);
      } else {
        console.log(`Image ${index + 1}: [File name not available]`);
      }
    });

    // Creating webhook URL for the Astria Api to send a POST request after the model training is complete
    const webhookUrl = `${origin}/api/webhooks/train-model?user_id=${user.id}`;
    formData.append('tune[callback]', webhookUrl);

    // Making a POST request to the Astria API to train the model with the provided images
    const response = await axios.post(`${ASTRIA_BASEURL}/tunes`, formData, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const { status, data: tune } = response;

    if (status === 400) {
      throw 'webhookUrl must be a URL address';
    }
    if (status === 402) {
      throw 'Training models is only available on paid plans.';
    }

    // Store the model id from the api response in the database with original images and user details
    const { error } = await supabase.from('headshot_models').insert({
      model_id: tune.id,
      user_id: user.id,
      name: title,
      type,
      images: tune.orig_images,
      eta: tune.eta,
      status: 'processing', // Add this line
    });

    if (error) {
      throw error.message;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      return `API Error: ${error.response?.data?.error || error.message}`;
    }
    console.error('Error:', error);
    return `${error}`;
  }
}

// export async function getSubscription(userId: string) {
//   const supabase = await supabaseServerClient();
//   const { data, error } = await supabase
//     .from('subscriptions')
//     .select('type, amount, interval, start_date')
//     .eq('user_id', userId);

//   if (error) {
//     console.error('Error fetching subscription:', error);
//     return null;
//   }

//   if (data.length === 0) {
//     console.log('No subscriptions found for user:', userId);
//     return null;
//   }

//   console.log('Fetched subscription data:', data); // Log the fetched data for debugging
//   return data;
// }
