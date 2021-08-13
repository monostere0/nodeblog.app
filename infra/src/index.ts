require('dotenv').config({ path: '../.env' });

import * as cdk from '@aws-cdk/core';

import DatabaseStack from './dynamoStack';
import LambdasStack from './lambdasStack';
import ApiGatewayStack from './apiGatewayStack';
import S3DeployStack from './s3Stack';
import HostedZoneStack from './hostedZoneStack';
import ACMStack from './acmStack';
import CloudFrontStack from './cloudFrontStack';

const CLOUDFRONT_CERT_REGION = 'us-east-1';
const DOMAIN_NAME = 'nodeblog.app';
const API_DOMAIN_NAME = 'api.nodeblog.app';

const app = new cdk.App();

function main() {
  const hostedZoneStack = stackFactory<HostedZoneStack>(
    HostedZoneStack,
    'NodeBlog-HostedZoneStack',
    { domainName: DOMAIN_NAME }
  );

  const apiAcm = stackFactory<ACMStack>(ACMStack, 'NodeBlog-ACMApiStack', {
    hostedZoneForValidation: hostedZoneStack.hostedZone,
    certificateName: API_DOMAIN_NAME,
    domainName: API_DOMAIN_NAME,
    region: process.env.CDK_DEPLOY_REGION,
  });

  const websiteAcm = stackFactory<ACMStack>(
    ACMStack,
    'NodeBlog-ACMWebsiteStack',
    {
      hostedZoneForValidation: hostedZoneStack.hostedZone,
      certificateName: DOMAIN_NAME,
      domainName: DOMAIN_NAME,
      region: CLOUDFRONT_CERT_REGION,
    }
  );

  const databaseStack = stackFactory<DatabaseStack>(
    DatabaseStack,
    'NodeBlog-DatabaseStack'
  );

  const lambdasStack = stackFactory<LambdasStack>(
    LambdasStack,
    'NodeBlog-LambdasStack',
    {
      tables: databaseStack.tables,
    }
  );

  stackFactory<ApiGatewayStack>(ApiGatewayStack, 'NodeBlog-ApiGwStack', {
    lambdas: lambdasStack.lambdas,
    certificate: apiAcm.certificate,
    domainName: API_DOMAIN_NAME,
    hostedZone: hostedZoneStack.hostedZone,
  });

  const s3DeployStack = stackFactory<S3DeployStack>(
    S3DeployStack,
    'NodeBlog-WebsiteHostBucketStack',
    { bucketName: DOMAIN_NAME }
  );

  stackFactory<CloudFrontStack>(CloudFrontStack, 'NodeBlog-CloudFrontStack', {
    certificate: websiteAcm.certificate,
    hostedBucket: s3DeployStack.bucket,
    domainName: DOMAIN_NAME,
    hostedZone: hostedZoneStack.hostedZone,
  });

  app.synth();
}

function stackFactory<T>(
  Stack: typeof cdk.Stack,
  stackName: string,
  stackParams?: Record<string, unknown>
): T {
  return new Stack(app, stackName, {
    stackName,
    env: {
      account: process.env.CDK_DEPLOY_ACCOUNT,
      region: process.env.CDK_DEPLOY_REGION,
    },
    ...stackParams,
  }) as unknown as T;
}

main();
