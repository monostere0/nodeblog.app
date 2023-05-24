import { ScheduledEvent, ScheduledHandler } from 'aws-lambda';
import log from 'lambda-log';
import slugify from '@sindresorhus/slugify';
import generateSillyName from 'sillyname';

import createArticleFromParams from '../createArticleFromParams';

import { Article } from '../interfaces';
import { createResponse } from '../utils/lambda';
import getTopTwoRedditArticles from '../utils/reddit';
import getArticleContentFromTitle from '../utils/chatgpt';

export const handler: ScheduledHandler = async (
  event: ScheduledEvent
): Promise<any> => {
  try {
    console.log(event);

    const suggestedTitles = await getTopTwoRedditArticles();

    const createArticlesRequests = suggestedTitles.map(
      async (suggestedTitle) => {
        console.log('Article title:', suggestedTitle);

        const articleContent = await getArticleContentFromTitle(suggestedTitle);

        console.log('Article Content:', articleContent);

        const articleItem = {
          authorName: generateSillyName(),
          title: suggestedTitle,
          content: escape(articleContent),
          date: new Date().toJSON(),
          slug: slugify(suggestedTitle).split('-').slice(0, 4).join('-'),
        } as Article;

        return await createArticleFromParams(articleItem);
      }
    );

    const articleIds = await Promise.all(createArticlesRequests);

    return createResponse(200, { id: articleIds });
  } catch (error) {
    log.error(error);
    return createResponse(400, { id: null });
  }
};
