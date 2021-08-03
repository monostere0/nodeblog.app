import AWS from 'aws-sdk';
import { Handler, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import log from 'lambda-log';
import slugify from '@sindresorhus/slugify';

import { Article } from './interfaces';
import { createResponse } from './utils/lambda';

const dynamoClient = new AWS.DynamoDB.DocumentClient();

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log(event);

    const requestBody = JSON.parse(event.body as string) as Article;
    const articleId = uuidv4();

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

    await dynamoClient
      .put({
        TableName: process.env.DYNAMO_TABLE,
        Item: {
          id: articleId,
          ...requestBody,
        },
      })
      .promise();

    return createResponse(200, { id: articleId });
  } catch (error) {
    log.error(error);
    return createResponse(400, { id: null });
  }
};
