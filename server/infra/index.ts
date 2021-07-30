import * as cdk from "@aws-cdk/core";

import DatabaseStack from "./database";
import LambdasStack from "./lambdas";
import ApiGatewayStack from "./gateway";

function main() {
  const app = new cdk.App();

  const databaseStack = new DatabaseStack(app, "NodeBlog-DatabaseStack", {
    stackName: "NodeBlog-DatabaseStack",
    env: { region: "eu-central-1" },
  });

  const lambdasStack = new LambdasStack(app, "NodeBlog-LambdasStack", {
    stackName: "NodeBlog-LambdasStack",
    tables: databaseStack.tables,
    env: { region: "eu-central-1" },
  });

  new ApiGatewayStack(app, "NodeBlog-ApiGwStack", {
    stackName: "NodeBlog-ApiGwStack",
    lambdas: lambdasStack.lambdas,
    env: { region: "eu-central-1" },
  });

  app.synth();
}

main();
