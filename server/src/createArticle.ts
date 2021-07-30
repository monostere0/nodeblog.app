import AWS from "aws-sdk";
import { Handler, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { Article } from "./interfaces";
import { v4 as uuidv4 } from "uuid";
import log from "lambda-log";

const dynamoClient = new AWS.DynamoDB.DocumentClient({
  region: "eu-central-1",
});

export const handler: Handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const requestBody = JSON.parse(event.body as string) as Article;
    const articleId = uuidv4();

    requestBody.date = new Date().toJSON();

    await dynamoClient
      .put({
        TableName: process.env.DYNAMO_TABLE,
        Item: {
          id: articleId,
          ...requestBody,
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ id: articleId }),
    };
  } catch (error) {
    log.error(error);
  }
};
