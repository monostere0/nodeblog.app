import * as cdk from '@aws-cdk/core';
import * as cf from '@aws-cdk/aws-cloudfront';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';

import { IBucket } from '@aws-cdk/aws-s3';
import { ICertificate } from '@aws-cdk/aws-certificatemanager';

interface Props extends cdk.StackProps {
  hostedBucket: IBucket;
  certificate: ICertificate;
  domainName: string;
}

export default class CloudFrontStack extends cdk.Stack {
  distribution: cf.CloudFrontWebDistribution;

  constructor(scope: cdk.Construct, id: string, props?: Props) {
    super(scope, id, props);

    const viewerCertificate = cf.ViewerCertificate.fromAcmCertificate(
      {
        certificateArn: props.certificate.certificateArn,
        env: {
          region: cdk.Aws.REGION,
          account: cdk.Aws.ACCOUNT_ID,
        },
        node: this.node,
        stack: this,
        metricDaysToExpiry: () =>
          new cloudwatch.Metric({
            namespace: 'TLS Viewer Certificate Validity',
            metricName: 'TLS Viewer Certificate Expired',
          }),
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
  }
}
