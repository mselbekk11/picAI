'use server';

import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import axios from 'axios';
import { getAstriaKeyFromCookie } from '@/utils/cookie-store';

const ASTRIA_BASEURL = 'https://api.astria.ai';
const API_KEY = process.env.ASTRIA_API_KEY;

export async function finetuneModelFn(request: FormData) {
  const supabase = supabaseServerClient();
  const user = await getUserDetails();

  const origin = headers().get('origin');

  const astriaUserKey = getAstriaKeyFromCookie();

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

    const formData = new FormData();
    formData.append('tune[title]', title);
    // Hard coded tune id of Realistic Vision v5.1 from - https://www.astria.ai/gallery/tunes/690204/prompts
    formData.append('tune[base_tune_id]', '690204');
    formData.append('tune[name]', type);

    images.forEach((file) => {
      formData.append('tune[images][]', file);
    });

    const webhookUrl = `${origin}/api/webhooks/train-model?user_id=${user.id}`;
    formData.append('tune[callback]', webhookUrl);

    const response = await axios.post(`${ASTRIA_BASEURL}/tunes`, formData, {
      headers: {
        Authorization: `Bearer ${astriaUserKey || API_KEY}`,
      },
    });

    const { status, data: tune } = response;

    if (status === 400) {
      throw 'webhookUrl must be a URL address';
    }
    if (status === 402) {
      throw 'Training models is only available on paid plans.';
    }

    const { error } = await supabase.from('headshot_models').insert({
      model_id: tune.id,
      user_id: user.id,
      name: title,
      type,
      images: tune.orig_images,
      eta: tune.eta,
    });

    if (error) {
      throw error.message;
    }
  } catch (error) {
    console.error(error);
    return `${error}`;
  }
}
