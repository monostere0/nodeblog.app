import fetch from 'node-fetch';

export default async function getTopTwoRedditArticles(): Promise<
  Array<string>
> {
  const response = await fetch(process.env.REDDIT_JSON_URL);
  const json = await response.json();

  return [getTitle(json, 0), getTitle(json, 1)];
}

function getTitle(json: any, index: number) {
  return json.data.children[index].data.title;
}
