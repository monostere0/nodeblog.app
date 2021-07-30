import AWS from "aws-sdk";
import { Handler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import log from "lambda-log";

import { unmarshallDynamoResults } from "./utils/dynamo";
import { Article } from "./interfaces";

const dynamoClient = new AWS.DynamoDB();

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { slug } = event.pathParameters;

    if (!slug) {
      return {
        statusCode: 404,
        body: "Article not found",
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
      return {
        statusCode: 404,
        body: "Article not found",
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(unmarshallDynamoResults<Article>(results)[0]),
    };
  } catch (error) {
    log.error(error);
    return {
      statusCode: 400,
      body: "An error has occurred.",
    };
  }
};
