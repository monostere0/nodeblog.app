import {
  App,
  Stack,
  StackProps,
  aws_cloudfront as cf,
  aws_s3 as s3,
  aws_s3_deployment as s3Deployment,
} from 'aws-cdk-lib';
import { join } from 'path';

interface Props extends StackProps {
  bucket: s3.IBucket;
  cloudfrontDistribution: cf.IDistribution;
}

export default class S3DeploymentStack extends Stack {
  constructor(app: App, id: string, props: Props) {
    super(app, id, props);

    new s3Deployment.BucketDeployment(
      this,
      'NodeBlog-WebsiteHostBucketDeployment',
      {
        sources: [
          s3Deployment.Source.asset(
            join(__dirname, '..', '..', 'frontend', 'build')
          ),
        ],
        destinationKeyPrefix: '/',
        destinationBucket: props.bucket,
        retainOnDelete: false,

        // Invalidate CloudFront when updating the website
        distribution: props.cloudfrontDistribution,
        distributionPaths: ['/*'],
      }
    );
  }
}
