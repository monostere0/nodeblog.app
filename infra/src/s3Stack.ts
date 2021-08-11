import path from 'path';
import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';

import { DOMAIN_NAME } from './route53Stack';

export default class S3DeployStack extends cdk.Stack {
  bucket: Bucket;

  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    this.bucket = new Bucket(this, 'NodeBlog-WebsiteHostBucket', {
      publicReadAccess: true,
      bucketName: DOMAIN_NAME,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      versioned: false,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
    });

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
        destinationBucket: this.bucket,
        retainOnDelete: false,
      }
    );
  }
}
