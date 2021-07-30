import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as lambdaNode from "@aws-cdk/aws-lambda-nodejs";
import { Table } from "@aws-cdk/aws-dynamodb";
import { join } from "path";

interface Props extends cdk.StackProps {
  tables: {
    usersTable: Table;
    postsTable: Table;
  };
}

export default class LambdasStack extends cdk.Stack {
  public lambdas: {
    createArticle: lambdaNode.NodejsFunction;
    getAllArticles: lambdaNode.NodejsFunction;
    getArticle: lambdaNode.NodejsFunction;
  };

  constructor(scope: cdk.Construct, id: string, props?: Props) {
    super(scope, id, props);

    this.lambdas = {
      createArticle: this.createLambda(
        "NodeBlog-createArticle",
        "createArticle.ts",
        {
          DYNAMO_TABLE: props.tables.postsTable.tableName,
        }
      ),
      getAllArticles: this.createLambda(
        "NodeBlog-getAllArticles",
        "getAllArticles.ts",
        {
          DYNAMO_TABLE: props.tables.postsTable.tableName,
        }
      ),
      getArticle: this.createLambda("NodeBlog-getArticle", "getArticle.ts", {
        DYNAMO_TABLE: props.tables.postsTable.tableName,
      }),
    };

    props.tables.postsTable.grantReadWriteData(this.lambdas.createArticle);
    props.tables.postsTable.grantReadWriteData(this.lambdas.getAllArticles);
    props.tables.postsTable.grantReadWriteData(this.lambdas.getArticle);
  }

  private createLambda(
    name: string,
    fileName: string,
    environment?: { [key: string]: string }
  ): lambdaNode.NodejsFunction {
    return new lambdaNode.NodejsFunction(this, name, {
      functionName: name,
      entry: join(__dirname, "..", "src", fileName),
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment,
      runtime: lambda.Runtime.NODEJS_14_X,
    });
  }
}
