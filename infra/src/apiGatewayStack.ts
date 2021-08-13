import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as route53 from '@aws-cdk/aws-route53';
import { ApiGateway } from '@aws-cdk/aws-route53-targets';

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
  hostedZone: route53.IHostedZone;
}

export default class ApiGatewayStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: Props) {
    super(scope, id, props);

    const restApi = new apigw.RestApi(this, 'NodeBlog-ApiGateway', {
      restApiName: 'NodeBlog-ApiGateway',
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
      },
      domainName: {
        certificate: props.certificate,
        domainName: props.domainName,
      },
    });

    const articles = restApi.root.addResource('articles');
    this.registerMethod(articles, 'GET', props.lambdas.getAllArticles);
    this.registerMethod(articles, 'POST', props.lambdas.createArticle);

    const article = articles.addResource('{slug}');
    this.registerMethod(article, 'GET', props.lambdas.getArticle);

    new route53.ARecord(this, 'NodeBlog-ApiTargetARecord', {
      zone: props.hostedZone,
      recordName: 'api',
      target: route53.RecordTarget.fromAlias(new ApiGateway(restApi)),
    });
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
