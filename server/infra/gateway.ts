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
    });

    const articles = this.restApi.root.addResource("articles");
    articles.addMethod(
      "GET",
      new apigw.LambdaIntegration(props.lambdas.getAllArticles)
    );
    articles.addMethod(
      "POST",
      new apigw.LambdaIntegration(props.lambdas.createArticle)
    );
    this.addCorsOptions(articles);

    const article = articles.addResource("{slug}");
    article.addMethod(
      "GET",
      new apigw.LambdaIntegration(props.lambdas.getArticle)
    );
    this.addCorsOptions(article);
  }

  private addCorsOptions(apiResource: apigw.IResource): void {
    apiResource.addMethod(
      "OPTIONS",
      new apigw.MockIntegration({
        integrationResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Headers":
                "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
              "method.response.header.Access-Control-Allow-Origin": "'*'",
              "method.response.header.Access-Control-Allow-Credentials":
                "'false'",
              "method.response.header.Access-Control-Allow-Methods":
                "'OPTIONS,GET,PUT,POST,DELETE'",
            },
          },
        ],
        passthroughBehavior: apigw.PassthroughBehavior.NEVER,
        requestTemplates: {
          "application/json": '{"statusCode": 200}',
        },
      }),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Headers": true,
              "method.response.header.Access-Control-Allow-Methods": true,
              "method.response.header.Access-Control-Allow-Credentials": true,
              "method.response.header.Access-Control-Allow-Origin": true,
            },
          },
        ],
      }
    );
  }
}
