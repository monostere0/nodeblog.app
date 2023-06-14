import { parse } from 'rss-to-json';

export default async function getTopTwoArticleTitles(): Promise<Array<string>> {
  const response = await parse(process.env.ARTICLE_TITLES_URL);

  return [getTitle(response, 0), getTitle(response, 1)];
}

function getTitle(json: any, index: number) {
  return json.items[index].title;
}
