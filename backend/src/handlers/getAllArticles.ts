import AWS from 'aws-sdk';
import { Handler, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import log from 'lambda-log';

import { unmarshallDynamoResults } from '../utils/dynamo';
import { createResponse } from '../utils/lambda';
import { Article } from '../interfaces';

const dynamoClient = new AWS.DynamoDB();

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    log.info(`SELECT * FROM ${process.env.DYNAMO_TABLE}`);

    const results = await dynamoClient
      .executeStatement({
        Statement: `SELECT * FROM "${process.env.DYNAMO_TABLE}"`,
      })
      .promise();

    const articles = unmarshallDynamoResults<Article>(results);

    return createResponse(
      200,
      // Restore special characters
      articles.map((article: Article) => ({
        ...article,
        content: unescape(article.content),
      }))
    );
  } catch (error) {
    log.error(error);
    return createResponse(400, 'An error has occured.');
  }
};
