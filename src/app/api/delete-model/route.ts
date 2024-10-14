import { NextResponse } from 'next/server';
import { supabaseServerClient } from '@/utils/supabase/server';

export async function DELETE(request: Request) {
  const supabase = supabaseServerClient();
  const { modelId } = await request.json();

  if (!modelId) {
    return NextResponse.json({ error: 'Model ID is required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('headshot_models')
    .delete()
    .eq('model_id', modelId);

  if (error) {
    console.error('Error deleting model:', error);
    return NextResponse.json({ error: 'Failed to delete model' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Model deleted successfully' }, { status: 200 });
}