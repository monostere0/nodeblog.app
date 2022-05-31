import {
  StackProps,
  Stack,
  App,
  aws_certificatemanager as acm,
  aws_route53 as route53,
} from 'aws-cdk-lib';

interface Props extends StackProps {
  hostedZoneForValidation?: route53.IHostedZone;
  domainName: string;
  certificateName: string;
  region: string;
}

export default class ACMStack extends Stack {
  public certificate: acm.Certificate;

  constructor(app: App, id: string, props?: Props) {
    super(app, id, props);

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
      options as unknown as acm.DnsValidatedCertificateProps
    );
  }
}
