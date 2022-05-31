import {
  App,
  Stack,
  StackProps,
  aws_dynamodb as dynamodb,
  RemovalPolicy,
} from 'aws-cdk-lib';

export default class DatabaseStack extends Stack {
  public tables: {
    usersTable: dynamodb.Table;
    postsTable: dynamodb.Table;
  };

  constructor(app: App, id: string, props?: StackProps) {
    super(app, id, props);

    this.tables = {
      usersTable: this.createDynamoTable('NodeBlog-Users'),
      postsTable: this.createDynamoTable('NodeBlog-Posts', true),
    };
  }

  private createDynamoTable(
    tableName: string,
    shouldBeRetained?: boolean
  ): dynamodb.Table {
    return new dynamodb.Table(this, tableName, {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: shouldBeRetained
        ? RemovalPolicy.RETAIN
        : RemovalPolicy.DESTROY,
    });
  }
}
