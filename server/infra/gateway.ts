import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';

interface Props extends cdk.StackProps {
  lambdas: {
    createArticle: NodejsFunction,
    getAllArticles: NodejsFunction,
    getArticle: NodejsFunction,
  },
};

export default class CloudWatchDashboardStack extends cdk.Stack {
  public apiGateway: apigw.RestApi;

  constructor(scope: cdk.Construct, id: string, props?: Props) {
    super(scope, id, props);

    this.apiGateway = new apigw.RestApi(this, 'NodeBlog-ApiGateway', {
      restApiName: 'NodeBlog-ApiGateway',
    });
  }
}
