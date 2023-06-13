import { ScheduledEvent, ScheduledHandler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import log from 'lambda-log';
import slugify from '@sindresorhus/slugify';
import generateSillyName from 'sillyname';

import createArticleFromParams from '../createArticleFromParams';

import { Article } from '../interfaces';
import { createResponse } from '../utils/lambda';
import getTopTwoRedditArticles from '../utils/reddit';
import {
  getArticleContentFromTitle,
  getArticleImageFromTitle,
} from '../utils/openai';

const s3 = new S3();

export const handler: ScheduledHandler = async (
  event: ScheduledEvent
): Promise<any> => {
  try {
    console.log(event);

    const suggestedTitles = await getTopTwoRedditArticles();

    const createArticlesRequests = suggestedTitles.map(
      async (suggestedTitle) => {
        console.log('Article title:', suggestedTitle);

        const [articleContent, articleImage] = await Promise.all([
          getArticleContentFromTitle(suggestedTitle),
          getArticleImageFromTitle(suggestedTitle),
        ]);

        await s3
          .putObject({
            Bucket: process.env.IMAGES_BUCKET_NAME,
            Key: `${articleImage.title}.png`,
            Body: articleImage.content,
          })
          .promise();

        const articleItem = {
          authorName: generateSillyName(),
          title: suggestedTitle,
          content: escape(articleContent),
          date: new Date().toJSON(),
          slug: slugify(suggestedTitle).split('-').slice(0, 4).join('-'),
          image: articleImage.title,
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
