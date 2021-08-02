import * as cdk from '@aws-cdk/core';

import DatabaseStack from './database';
import LambdasStack from './lambdas';
import ApiGatewayStack from './gateway';

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

  app.synth();
}

main();
