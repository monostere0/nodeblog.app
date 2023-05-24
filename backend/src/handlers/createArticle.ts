import { Handler, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import log from 'lambda-log';
import slugify from '@sindresorhus/slugify';

import createArticleFromParams from '../createArticleFromParams';

import { Article } from '../interfaces';
import { createResponse } from '../utils/lambda';

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log(event);

    const requestBody = JSON.parse(event.body as string) as Article;

    requestBody.date = new Date().toJSON();
    requestBody.slug = slugify(requestBody.title)
      .split('-')
      .slice(0, 3)
      .join('-');

    // TODO: Replace this with once auth is in place
    requestBody.authorName = 'unknown';

    // Escape line breaks and other characters before saving to DDB
    requestBody.content = escape(requestBody.content);

    console.log('Article', requestBody);

    const articleId = await createArticleFromParams(requestBody);

    return createResponse(200, { id: articleId });
  } catch (error) {
    log.error(error);
    return createResponse(400, { id: null });
  }
};
