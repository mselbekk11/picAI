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

  try {
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

    console.log(`Model has been finetuned for Id: ${tune.id}`);

    const { error: modelUpdatedError } = await supabaseAdmin
      .from('headshot_models')
      .update({
        status: 'finished',
        trained_at: tune.trained_at,
        expires_at: tune.expires_at,
      })
      .eq('model_id', tune.id);

    if (modelUpdatedError) {
      console.error({ modelUpdatedError });
      throw modelUpdatedError.message;
    }

    return NextResponse.json({ message: 'success' }, { status: 200, statusText: 'Success' });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
