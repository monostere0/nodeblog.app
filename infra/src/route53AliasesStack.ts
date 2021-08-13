import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import { ApiGateway, BucketWebsiteTarget } from '@aws-cdk/aws-route53-targets';
import { RestApi } from '@aws-cdk/aws-apigateway';
import { IBucket } from '@aws-cdk/aws-s3';

interface Props extends cdk.StackProps {
  hostedZone: route53.IHostedZone;
  apiGateway: RestApi;
  hostedBucket: IBucket;
}

export default class Route53AliasesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: Props) {
    super(scope, id, props);

    new route53.ARecord(this, 'NodeBlog-BucketS3TargetARecord', {
      zone: props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new BucketWebsiteTarget(props.hostedBucket)
      ),
    });

    new route53.ARecord(this, 'NodeBlog-ApiTargetARecord', {
      zone: props.hostedZone,
      recordName: 'api',
      target: route53.RecordTarget.fromAlias(new ApiGateway(props.apiGateway)),
    });
  }
}
