import { Configuration, OpenAIApi } from 'openai';
import * as log from 'lambda-log';
import { ArticleImage } from '../interfaces';
import { randomUUID } from 'crypto';
import fetch from 'node-fetch';

const configuration = new Configuration({
  organization: 'org-APk6Xakwhm1Rz4izHjnIcyYh',
  apiKey: process.env.OPENAI_KEY,
});
const openAI = new OpenAIApi(configuration);

export async function getArticleContentFromTitle(
  title: string
): Promise<string> {
  log.info(
    `Getting ChatGPT completion for 'Write a 200 words article about the topic "${title}"'`
  );

  const completion = await openAI.createCompletion({
    model: 'text-davinci-003',
    prompt: `Write a 180 words article about the topic "${title}"`,
    max_tokens: 256,
  });

  log.info('OpenAI response', completion.data);

  return completion.data.choices.map((choice) => choice.text).join(' ');
}

export async function getArticleImageFromTitle(
  title: string
): Promise<ArticleImage> {
  const response = await openAI.createImage({
    prompt: `${title}, digital art`,
    n: 1,
    size: '256x256',
  });

  const { data } = response.data;

  log.info('image response', data);

  if (data.length === 0) {
    throw new Error('Could not properly generate the image.');
  }

  const imageBuffer = await getImageBufferFromUrl(data[0].url);

  return {
    title: randomUUID(),
    content: Buffer.from(imageBuffer),
  };
}

async function getImageBufferFromUrl(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  return await response.arrayBuffer();
}
