import * as cdk from '@aws-cdk/core';

import DatabaseStack from './dynamoStack';
import LambdasStack from './lambdasStack';
import ApiGatewayStack from './apiGatewayStack';
import S3DeployStack from './s3Stack';
import Route53Stack from './route53Stack';

const DEPLOY_REGION = 'eu-central-1';

function main() {
  const app = new cdk.App();

  const databaseStack = new DatabaseStack(app, 'NodeBlog-DatabaseStack', {
    stackName: 'NodeBlog-DatabaseStack',
    env: { region: DEPLOY_REGION },
  });

  const lambdasStack = new LambdasStack(app, 'NodeBlog-LambdasStack', {
    stackName: 'NodeBlog-LambdasStack',
    tables: databaseStack.tables,
    env: { region: DEPLOY_REGION },
  });

  new ApiGatewayStack(app, 'NodeBlog-ApiGwStack', {
    stackName: 'NodeBlog-ApiGwStack',
    lambdas: lambdasStack.lambdas,
    env: { region: DEPLOY_REGION },
  });

  const s3DeployStack = new S3DeployStack(
    app,
    'NodeBlog-WebsiteHostBucketStack',
    {
      stackName: 'NodeBlog-WebsiteHostBucketStack',
      env: { region: DEPLOY_REGION },
    }
  );

  new Route53Stack(app, 'NodeBlog-Route53Stack', {
    stackName: 'NodeBlog-Route53Stack',
    hostedBucket: s3DeployStack.bucket,
    env: { region: DEPLOY_REGION },
  });

  app.synth();
}

main();
