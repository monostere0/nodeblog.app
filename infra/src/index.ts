require('dotenv').config({ path: '../.env' });

import { App, Stack } from 'aws-cdk-lib';

import DatabaseStack from './dynamoStack';
import LambdasStack from './lambdasStack';
import ApiGatewayStack from './apiGatewayStack';
import S3WebsiteStack from './s3WebsiteStack';
import S3DeploymentStack from './s3DeploymentStack';
import HostedZoneStack from './hostedZoneStack';
import ACMStack from './acmStack';
import CloudFrontStack from './cloudFrontStack';
import SchedulerStack from './schedulerStack';

const CLOUDFRONT_CERT_REGION = 'us-east-1';
const DOMAIN_NAME = 'nodeblog.app';
const API_DOMAIN_NAME = 'api.nodeblog.app';

const app = new App();

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

  const s3WebsiteStack = stackFactory<S3WebsiteStack>(
    S3WebsiteStack,
    'NodeBlog-WebsiteHostBucketStack',
    { bucketName: DOMAIN_NAME }
  );

  const cfStack = stackFactory<CloudFrontStack>(
    CloudFrontStack,
    'NodeBlog-CloudFrontStack',
    {
      certificate: websiteAcm.certificate,
      hostedBucket: s3WebsiteStack.bucket,
      domainName: DOMAIN_NAME,
      hostedZone: hostedZoneStack.hostedZone,
    }
  );

  const schedulerStack = stackFactory<SchedulerStack>(
    SchedulerStack,
    'NodeBlog-SchedulerStack',
    {
      lambdas: {
        createWeeklyArticles: lambdasStack.lambdas.createWeeklyArticles,
      },
    }
  );

  stackFactory<S3DeploymentStack>(
    S3DeploymentStack,
    'NodeBlog-WebsiteHostBucketDeploymentStack',
    {
      bucket: s3WebsiteStack.bucket,
      cloudfrontDistribution: cfStack.distribution,
    }
  );

  app.synth();
}

function stackFactory<T>(
  AWSStack: typeof Stack,
  stackName: string,
  stackParams?: Record<string, unknown>
): T {
  return new AWSStack(app, stackName, {
    stackName,
    env: {
      account: process.env.CDK_DEPLOY_ACCOUNT,
      region: process.env.CDK_DEPLOY_REGION,
    },
    ...stackParams,
  }) as unknown as T;
}

main();
