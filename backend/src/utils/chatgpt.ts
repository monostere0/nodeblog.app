import { ChatGPTAPI } from 'chatgpt';

export default async function getArticleContentFromTitle(title: string) {
  const chatGptApi = new ChatGPTAPI({
    apiKey: process.env.OPENAI_KEY,
  });

  const response = await chatGptApi.sendMessage(
    `Write a 200 words article about the topic "${title}"`
  );

  return response.text;
}
