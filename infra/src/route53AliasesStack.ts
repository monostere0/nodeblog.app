import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import { ApiGateway, CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { RestApi } from '@aws-cdk/aws-apigateway';
import { IDistribution } from '@aws-cdk/aws-cloudfront';

interface Props extends cdk.StackProps {
  hostedZone: route53.IHostedZone;
  apiGateway: RestApi;
  cloudfrontDistribution: IDistribution;
}

export default class Route53AliasesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: Props) {
    super(scope, id, props);

    new route53.ARecord(this, 'NodeBlog-WebsiteTargetRecord', {
      zone: props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new CloudFrontTarget(props.cloudfrontDistribution)
      ),
    });

    new route53.ARecord(this, 'NodeBlog-ApiTargetARecord', {
      zone: props.hostedZone,
      recordName: 'api',
      target: route53.RecordTarget.fromAlias(new ApiGateway(props.apiGateway)),
    });
  }
}
