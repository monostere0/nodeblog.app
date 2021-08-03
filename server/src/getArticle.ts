import AWS from 'aws-sdk';
import { Handler, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import log from 'lambda-log';

import { unmarshallDynamoResults } from './utils/dynamo';
import { createResponse } from './utils/lambda';
import { Article } from './interfaces';

const dynamoClient = new AWS.DynamoDB();

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { slug } = event.pathParameters;

    if (!slug) {
      return {
        statusCode: 404,
        body: 'Article not found',
      };
    }

    const dynamoQuery = `SELECT * FROM "${process.env.DYNAMO_TABLE}" WHERE slug='${slug}'`;

    log.info(`query: ${dynamoQuery}`);

    const results = await dynamoClient
      .executeStatement({
        Statement: dynamoQuery,
      })
      .promise();

    if (results.Items.length === 0) {
      return createResponse(404, 'Article not found.');
    }

    // Restore special characters
    const article = unmarshallDynamoResults<Article>(results)[0];
    article.content = unescape(article.content);

    return createResponse(200, article);
  } catch (error) {
    log.error(error);
    return createResponse(400, 'An error has occurred.');
  }
};
