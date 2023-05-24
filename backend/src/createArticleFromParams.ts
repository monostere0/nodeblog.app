import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import slugify from '@sindresorhus/slugify';
import { Article } from './interfaces';

const dynamoClient = new AWS.DynamoDB.DocumentClient();

export default async function createArticleFromParams(
  article: Article
): Promise<string> {
  const articleId = uuidv4();

  try {
    await dynamoClient
      .put({
        TableName: process.env.DYNAMO_TABLE,
        Item: {
          id: articleId,
          ...article,
        },
      })
      .promise();

    return articleId;
  } catch (error) {
    throw error;
  }
}
