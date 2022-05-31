import {
  App,
  Stack,
  StackProps,
  aws_apigateway as apigw,
  aws_route53 as route53,
  aws_route53_targets as route53Targets,
  aws_certificatemanager as acm,
  aws_lambda_nodejs as aln,
} from 'aws-cdk-lib';

interface Props extends StackProps {
  lambdas: {
    createArticle: aln.NodejsFunction;
    getAllArticles: aln.NodejsFunction;
    getArticle: aln.NodejsFunction;
  };
  certificate: acm.ICertificate;
  domainName: string;
  hostedZone: route53.IHostedZone;
}

export default class ApiGatewayStack extends Stack {
  constructor(app: App, id: string, props?: Props) {
    super(app, id, props);

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
      target: route53.RecordTarget.fromAlias(
        new route53Targets.ApiGateway(restApi)
      ),
    });
  }

  private registerMethod(
    resource: apigw.Resource,
    httpVerb: string,
    lambda: aln.NodejsFunction
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
