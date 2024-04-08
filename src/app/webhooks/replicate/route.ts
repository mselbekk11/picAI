import { supabaseAdmin } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  const prediction = await req.json();

  try {
    console.log(`Generation received for Prediction: ${prediction.id}`);

    let updateData = null;
    if (prediction.status === 'failed') {
      updateData = { error: prediction.error };
    } else {
      updateData = { image_urls: prediction.output };
    }

    await supabaseAdmin.from('image_generations').update(updateData).eq('prediction_id', prediction.id);

    return NextResponse.json({ message: 'Webhook Received.' }, { status: 200 });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
