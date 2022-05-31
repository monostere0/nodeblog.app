import {
  Aws,
  App,
  Stack,
  StackProps,
  aws_cloudfront as cf,
  aws_cloudwatch as cloudwatch,
  aws_route53 as route53,
  aws_route53_targets as route53Targets,
  aws_s3 as s3,
  aws_certificatemanager as acm,
  RemovalPolicy,
} from 'aws-cdk-lib';

interface Props extends StackProps {
  hostedBucket: s3.IBucket;
  certificate: acm.ICertificate;
  domainName: string;
  hostedZone: route53.IHostedZone;
}

export default class CloudFrontStack extends Stack {
  public distribution: cf.IDistribution;

  constructor(app: App, id: string, props?: Props) {
    super(app, id, props);

    const viewerCertificate = cf.ViewerCertificate.fromAcmCertificate(
      {
        certificateArn: props.certificate.certificateArn,
        env: {
          region: Aws.REGION,
          account: Aws.ACCOUNT_ID,
        },
        node: this.node,
        stack: this,
        metricDaysToExpiry: () =>
          new cloudwatch.Metric({
            namespace: 'TLS Viewer Certificate Validity',
            metricName: 'TLS Viewer Certificate Expired',
          }),
        applyRemovalPolicy: () => RemovalPolicy.RETAIN,
      },
      {
        sslMethod: cf.SSLMethod.SNI,
        securityPolicy: cf.SecurityPolicyProtocol.TLS_V1_1_2016,
        aliases: [props.domainName],
      }
    );

    this.distribution = new cf.CloudFrontWebDistribution(
      this,
      'NodeBlog-CFWebDistribution',
      {
        viewerCertificate,
        // Needed for React router
        errorConfigurations: [
          {
            errorCode: 404,
            errorCachingMinTtl: 0,
            responseCode: 200,
            responsePagePath: '/index.html',
          },
        ],
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: props.hostedBucket,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                compress: true,
                allowedMethods: cf.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              },
            ],
          },
        ],
      }
    );

    new route53.ARecord(this, 'NodeBlog-WebsiteTargetRecord', {
      zone: props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(this.distribution)
      ),
    });
  }
}
