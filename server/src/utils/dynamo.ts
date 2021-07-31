import AWS from 'aws-sdk';

export function unmarshallDynamoResults<T>(
  results: AWS.DynamoDB.ExecuteStatementOutput
): T[] {
  return results.Items.map(
    (item) => AWS.DynamoDB.Converter.unmarshall(item) as T
  );
}
