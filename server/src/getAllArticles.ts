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
    log.info(`SELECT * FROM ${process.env.DYNAMO_TABLE}`);

    const results = await dynamoClient
      .executeStatement({
        Statement: `SELECT * FROM "${process.env.DYNAMO_TABLE}"`,
      })
      .promise();

    return createResponse(200, unmarshallDynamoResults<Article>(results));
  } catch (error) {
    log.error(error);
    return createResponse(400, 'An error has occured.');
  }
};
