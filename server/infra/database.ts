import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export default class CloudWatchDashboardStack extends cdk.Stack {
  public tables: { [key: string]: dynamodb.Table };

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.tables.usersTable = this.createDynamoTable('NodeBlog-Users');
    this.tables.postsTable = this.createDynamoTable('NodeBlog-Posts');
  }

  private createDynamoTable(tableName: string): dynamodb.Table {
    return new dynamodb.Table(this, tableName, {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,

      // Obviously this shouldn't be done in prod
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
