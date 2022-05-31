import { App, Stack, StackProps, aws_route53 as route53 } from 'aws-cdk-lib';

interface Props extends StackProps {
  domainName: string;
}

export default class HostedZoneStack extends Stack {
  public hostedZone: route53.IHostedZone;

  constructor(app: App, id: string, props?: Props) {
    super(app, id, props);

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
