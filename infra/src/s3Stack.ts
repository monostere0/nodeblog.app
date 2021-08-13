import path from 'path';
import * as cdk from '@aws-cdk/core';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import * as s3 from '@aws-cdk/aws-s3';
import * as cf from '@aws-cdk/aws-cloudfront';
import * as iam from '@aws-cdk/aws-iam';

interface Props extends cdk.StackProps {
  bucketName: string;
}

export default class S3DeployStack extends cdk.Stack {
  bucket: s3.Bucket;

  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, 'NodeBlog-WebsiteHostBucket', {
      publicReadAccess: true,
      bucketName: props.bucketName,
      versioned: false,
      websiteIndexDocument: 'index.html',

      // Small trick to have React router working
      websiteErrorDocument: 'index.html',

      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    this.bucket.grantRead(new iam.AnyPrincipal());

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
