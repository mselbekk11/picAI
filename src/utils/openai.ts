import OpenAI from 'openai';

async function openaiCreateContent(topic: string, style: string) {
  const openai = new OpenAI();

  const prompt = `
  Generate 5 social media contents on the topic: ${topic}.
  Make sure the style of the content is around ${style}.

  The content should be at least 500 characters in length.
  Please format the result as JSON, following this example:
  {outputs: [{"title": "TITLE", "content": "CONTENT"}]}`;

  console.log('Generating contents...');

  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4-0125-preview',
    max_tokens: 1000,
    temperature: 0.9,
    response_format: {
      type: 'json_object',
    },
  });

  const results = response.choices[0].message.content;

  return JSON.parse(results!);
}

export default openaiCreateContent;
