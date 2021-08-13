import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { ICertificate } from '@aws-cdk/aws-certificatemanager';

interface Props extends cdk.StackProps {
  lambdas: {
    createArticle: NodejsFunction;
    getAllArticles: NodejsFunction;
    getArticle: NodejsFunction;
  };
  certificate: ICertificate;
  domainName: string;
}

export default class ApiGatewayStack extends cdk.Stack {
  public restApi: apigw.RestApi;

  constructor(scope: cdk.Construct, id: string, props?: Props) {
    super(scope, id, props);

    this.restApi = new apigw.RestApi(this, 'NodeBlog-ApiGateway', {
      restApiName: 'NodeBlog-ApiGateway',
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
      },
      domainName: {
        certificate: props.certificate,
        domainName: props.domainName,
      },
    });

    const articles = this.restApi.root.addResource('articles');
    this.registerMethod(articles, 'GET', props.lambdas.getAllArticles);
    this.registerMethod(articles, 'POST', props.lambdas.createArticle);

    const article = articles.addResource('{slug}');
    this.registerMethod(article, 'GET', props.lambdas.getArticle);
  }

  private registerMethod(
    resource: apigw.Resource,
    httpVerb: string,
    lambda: NodejsFunction
  ) {
    resource.addMethod(
      httpVerb,
      new apigw.LambdaIntegration(lambda, {
        integrationResponses: [
          {
            statusCode: '200',
            responseParameters: {
              'method.response.header.Access-Control-Allow-Headers':
                "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
              'method.response.header.Access-Control-Allow-Origin': "'*'",
              'method.response.header.Access-Control-Allow-Credentials':
                "'false'",
              'method.response.header.Access-Control-Allow-Methods':
                "'OPTIONS,GET,PUT,POST,DELETE'",
            },
          },
        ],
      }),
      {
        methodResponses: [
          {
            statusCode: '200',
            responseParameters: {
              'method.response.header.Access-Control-Allow-Headers': true,
              'method.response.header.Access-Control-Allow-Methods': true,
              'method.response.header.Access-Control-Allow-Credentials': true,
              'method.response.header.Access-Control-Allow-Origin': true,
            },
          },
        ],
      }
    );
  }
}
