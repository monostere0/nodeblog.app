import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import { BucketWebsiteTarget } from '@aws-cdk/aws-route53-targets';
import { IBucket } from '@aws-cdk/aws-s3';

export const DOMAIN_NAME = 'nodeblog.app';
export const API_DOMAIN_NAME = 'api.nodeblog.app';

interface Props extends cdk.StackProps {
  hostedBucket: IBucket;
}

export default class Route53Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: Props) {
    super(scope, id, props);

    const hostedZone = new route53.HostedZone(this, 'NodeBlog-HostedZone', {
      zoneName: DOMAIN_NAME,
    });

    hostedZone.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);

    new route53.ARecord(this, 'NodeBlog-BucketS3TargetARecord', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new BucketWebsiteTarget(props.hostedBucket)
      ),
    });
  }
}
