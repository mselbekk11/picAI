import Replicate from 'replicate';
import { headers } from 'next/headers';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function startGeneration(inputs: TypeGenerationInput): Promise<string> {
  const { modelVersion, prompt, negativePrompt, guidance, inference, noOfOutputs } = inputs;

  const origin = headers().get('origin');

  const prediction = await replicate.predictions.create({
    version: modelVersion,
    input: {
      width: 1024,
      height: 1024,
      prompt,
      negative_prompt: negativePrompt ?? '',
      guidance_scale: guidance ?? 7.5,
      num_inference_steps: inference ?? 50,
      num_outputs: noOfOutputs ?? 1,
      apply_watermark: false,
    },
    webhook: `${origin}/webhooks/replicate`,
    webhook_events_filter: ['completed'],
  });

  console.log(`Generation started with Prediction Id: ${prediction.id}`);

  return prediction.id;
}

export type TypeGenerationInput = {
  modelVersion: string;
  prompt: string;
  negativePrompt: string;
  guidance?: number;
  inference?: number;
  noOfOutputs?: number;
};
