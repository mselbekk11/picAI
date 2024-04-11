import { supabaseAdmin } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

type TuneData = {
  id: number;
  title: string;
  name: string;
  steps: null;
  trained_at: null;
  started_training_at: null;
  created_at: string;
  updated_at: string;
  expires_at: null;
};

export async function POST(req: Request): Promise<NextResponse> {
  const incomingData = (await req.json()) as { tune: TuneData };
  const { tune } = incomingData;

  const urlObj = new URL(req.url);
  const user_id = urlObj.searchParams.get('user_id');

  if (!user_id) {
    throw 'Malformed URL, no user_id detected!';
  }

  const { data: user, error } = await supabaseAdmin.from('users').select().eq('id', user_id).single();

  if (error) {
    throw error.message;
  }
  if (!user) {
    throw 'User not found.';
  }

  try {
    console.log(`Model has been fintuned for Id: ${tune.id}, User: ${user_id}`);

    // TODO: send notif mail
    // Notify user via email
    // const resend = new Resend(resendApiKey);
    // await resend.emails.send({
    //   from: 'noreply@headshots.tryleap.ai',
    //   to: user?.email ?? '',
    //   subject: 'Your model was successfully trained!',
    //   html: `<h2>We're writing to notify you that your model training was successful! 1 credit has been used from your account.</h2>`,
    // });

    const { data: modelUpdated, error: modelUpdatedError } = await supabaseAdmin
      .from('headshot_models')
      .update({
        status: 'finished',
        trained_at: tune.trained_at,
        expires_at: tune.expires_at,
      })
      .eq('model_id', tune.id)
      .select();

    if (modelUpdatedError) {
      console.error({ modelUpdatedError });
    }
    if (!modelUpdated) {
      console.error('No model updated!');
      console.error({ modelUpdated });
    }

    return NextResponse.json({ message: 'success' }, { status: 200, statusText: 'Success' });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
