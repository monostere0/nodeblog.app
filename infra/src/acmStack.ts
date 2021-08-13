import * as cdk from '@aws-cdk/core';
import * as acm from '@aws-cdk/aws-certificatemanager';
import { IHostedZone } from '@aws-cdk/aws-route53';
import { DnsValidatedCertificateProps } from '@aws-cdk/aws-certificatemanager';

interface Props extends cdk.StackProps {
  hostedZoneForValidation?: IHostedZone;
  domainName: string;
  certificateName: string;
  region: string;
}

export default class ACMStack extends cdk.Stack {
  public certificate: acm.Certificate;

  constructor(scope: cdk.Construct, id: string, props?: Props) {
    super(scope, id, props);

    const options: Record<string, unknown> = {
      domainName: props.domainName,
      region: props.region,
    };

    if (props.hostedZoneForValidation !== undefined) {
      options.hostedZone = props.hostedZoneForValidation;
    }

    this.certificate = new acm.DnsValidatedCertificate(
      this,
      props.certificateName,
      options as unknown as DnsValidatedCertificateProps
    );
  }
}
