import path from 'path';
import * as cdk from '@aws-cdk/core';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import * as s3 from '@aws-cdk/aws-s3';
import * as cf from '@aws-cdk/aws-cloudfront';

interface Props extends cdk.StackProps {
  bucket: s3.IBucket;
  cloudfrontDistribution: cf.IDistribution;
}

export default class S3DeploymentStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id, props);

    new s3Deployment.BucketDeployment(
      this,
      'NodeBlog-WebsiteHostBucketDeployment',
      {
        sources: [
          s3Deployment.Source.asset(
            path.join(__dirname, '..', '..', 'frontend', 'build')
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
