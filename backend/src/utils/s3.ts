import { AWSError, S3 } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

const s3 = new S3();

export async function saveImageToBucket(
  bucketName: string,
  title: string,
  content: string | Buffer
): Promise<PromiseResult<S3.PutObjectOutput, AWSError>> {
  return await s3
    .putObject({
      Bucket: bucketName,
      Key: `${title}.png`,
      Body: content,
    })
    .promise();
}

export async function getImageBase64UrlFromBucket(
  bucketName: string,
  title: string
): Promise<string> {
  const s3Result = await s3
    .getObject({
      Bucket: bucketName,
      Key: `${title}.png`,
    })
    .promise();

  return Buffer.from(s3Result.Body as Buffer).toString('base64');
}
