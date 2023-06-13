import {
  App,
  Stack,
  StackProps,
  aws_dynamodb as dynamodb,
  aws_lambda_nodejs as aln,
  aws_lambda as lambda,
  Duration,
} from 'aws-cdk-lib';
import { join } from 'path';

interface Props extends StackProps {
  tables: {
    usersTable: dynamodb.Table;
    postsTable: dynamodb.Table;
  };
}

export default class LambdasStack extends Stack {
  public lambdas: {
    createArticle: aln.NodejsFunction;
    getAllArticles: aln.NodejsFunction;
    getArticle: aln.NodejsFunction;
    createWeeklyArticles: aln.NodejsFunction;
  };

  constructor(app: App, id: string, props?: Props) {
    super(app, id, props);

    this.lambdas = {
      createArticle: this.createLambda(
        'NodeBlog-createArticle',
        'createArticle.ts',
        {
          DYNAMO_TABLE: props.tables.postsTable.tableName,
          IMAGES_BUCKET_NAME: process.env.IMAGES_BUCKET_NAME,
        }
      ),
      getAllArticles: this.createLambda(
        'NodeBlog-getAllArticles',
        'getAllArticles.ts',
        {
          DYNAMO_TABLE: props.tables.postsTable.tableName,
          IMAGES_BUCKET_NAME: process.env.IMAGES_BUCKET_NAME,
        }
      ),
      getArticle: this.createLambda('NodeBlog-getArticle', 'getArticle.ts', {
        DYNAMO_TABLE: props.tables.postsTable.tableName,
        IMAGES_BUCKET_NAME: process.env.IMAGES_BUCKET_NAME,
      }),
      createWeeklyArticles: this.createLambda(
        'NodeBlog-createWeeklyArticles',
        'createGptArticleHandler.ts',
        {
          REDDIT_JSON_URL: process.env.REDDIT_JSON_URL,
          OPENAI_KEY: process.env.OPENAI_KEY,
          DYNAMO_TABLE: props.tables.postsTable.tableName,
          IMAGES_BUCKET_NAME: process.env.IMAGES_BUCKET_NAME,
        }
      ),
    };

    props.tables.postsTable.grant(
      this.lambdas.createArticle,
      'dynamodb:PutItem'
    );
    props.tables.postsTable.grant(
      this.lambdas.createWeeklyArticles,
      'dynamodb:PutItem'
    );
    props.tables.postsTable.grant(
      this.lambdas.getAllArticles,
      'dynamodb:PartiQLSelect'
    );
    props.tables.postsTable.grant(
      this.lambdas.getArticle,
      'dynamodb:PartiQLSelect'
    );
  }

  private createLambda(
    name: string,
    fileName: string,
    environment?: { [key: string]: string }
  ): aln.NodejsFunction {
    return new aln.NodejsFunction(this, name, {
      functionName: name,
      awsSdkConnectionReuse: true,
      entry: join(
        __dirname,
        '..',
        '..',
        'backend',
        'src',
        'handlers',
        fileName
      ),
      bundling: {
        externalModules: ['aws-sdk/*'],
      },
      environment,
      runtime: lambda.Runtime.NODEJS_18_X,
      memorySize: 256,
      timeout: Duration.minutes(3),
    });
  }
}
