import { NextResponse } from 'next/server';
import { supabaseServerClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const { generationId, imageIndex } = await request.json();

  const supabase = supabaseServerClient();

  // Fetch the current image_urls
  const { data: generation, error: fetchError } = await supabase
    .from('headshot_generations')
    .select('image_urls')
    .eq('id', generationId)
    .single();

  if (fetchError) {
    return NextResponse.json({ error: 'Failed to fetch generation' }, { status: 500 });
  }

  // Add a null check before accessing image_urls
  const updatedImageUrls = generation.image_urls?.filter((_: string, i: number) => i !== imageIndex) ?? [];

  // Update the database
  const { error: updateError } = await supabase
    .from('headshot_generations')
    .update({ image_urls: updatedImageUrls })
    .eq('id', generationId);

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update generation' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
