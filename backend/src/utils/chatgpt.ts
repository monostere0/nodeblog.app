import { Configuration, OpenAIApi } from 'openai';
import * as log from 'lambda-log';

export default async function getArticleContentFromTitle(title: string) {
  log.info(
    `Getting ChatGPT completion for 'Write a 200 words article about the topic "${title}"'`
  );

  const configuration = new Configuration({
    organization: 'org-APk6Xakwhm1Rz4izHjnIcyYh',
    apiKey: process.env.OPENAI_KEY,
  });
  const openAI = new OpenAIApi(configuration);

  const completion = await openAI.createCompletion({
    model: 'text-davinci-003',
    prompt: `Write a 180 words article about the topic "${title}"`,
    max_tokens: 256,
  });

  log.info('OpenAI response', completion.data);

  return completion.data.choices.map((choice) => choice.text).join(' ');
}
