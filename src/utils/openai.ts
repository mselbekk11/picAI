import OpenAI from 'openai';

async function openaiGenerateImage(imageDescription: string) {
  const openai = new OpenAI();

  const prompt = `I want you to generate an image for the given Image Description: ${imageDescription}`;

  console.log('Generating image...');

  const response = await openai.images.generate({
    prompt,
    model: 'dall-e-3',
    quality: 'hd',
    size: '1024x1024',
    style: 'vivid',
    response_format: 'url',
  });

  // const results = response.data[0].b64_json;
  const imageUrl = response.data[0].url;

  return imageUrl;
}

export default openaiGenerateImage;
