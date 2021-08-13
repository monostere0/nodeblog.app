import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';

interface Props extends cdk.StackProps {
  domainName: string;
}

export default class HostedZoneStack extends cdk.Stack {
  public hostedZone: route53.IHostedZone;

  constructor(scope: cdk.Construct, id: string, props?: Props) {
    super(scope, id, props);

    this.hostedZone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      'NodeBlog-HostedZone',
      {
        hostedZoneId: process.env.CDK_HOSTEDZONE_ID,
        zoneName: props.domainName,
      }
    );
  }
}
