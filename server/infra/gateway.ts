import * as cdk from "@aws-cdk/core";
import * as apigw from "@aws-cdk/aws-apigateway";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";

interface Props extends cdk.StackProps {
  lambdas: {
    createArticle: NodejsFunction;
    getAllArticles: NodejsFunction;
    getArticle: NodejsFunction;
  };
}

export default class ApiGatewayStack extends cdk.Stack {
  public restApi: apigw.RestApi;

  constructor(scope: cdk.Construct, id: string, props?: Props) {
    super(scope, id, props);

    this.restApi = new apigw.RestApi(this, "NodeBlog-ApiGateway", {
      restApiName: "NodeBlog-ApiGateway",
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
      },
    });

    const articles = this.restApi.root.addResource("articles");
    this.registerMethod(articles, "GET", props.lambdas.getAllArticles);
    this.registerMethod(articles, "POST", props.lambdas.createArticle);

    const article = articles.addResource("{slug}");
    this.registerMethod(article, "GET", props.lambdas.getArticle);
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
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": "'*'",
            },
          },
        ],
        passthroughBehavior: apigw.PassthroughBehavior.NEVER,
        proxy: false,
        requestTemplates: {
          "application/json": '{"statusCode": 200}',
        },
      }),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": true,
            },
          },
        ],
      }
    );
  }
}
