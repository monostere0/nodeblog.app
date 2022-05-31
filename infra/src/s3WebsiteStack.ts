import {
  App,
  Stack,
  StackProps,
  aws_s3 as s3,
  aws_iam as iam,
  RemovalPolicy,
} from 'aws-cdk-lib';

interface Props extends StackProps {
  bucketName: string;
}

export default class S3WebsiteStack extends Stack {
  bucket: s3.Bucket;

  constructor(app: App, id: string, props: Props) {
    super(app, id, props);

    this.bucket = new s3.Bucket(this, 'NodeBlog-WebsiteHostBucket', {
      publicReadAccess: true,
      bucketName: props.bucketName,
      versioned: false,
      websiteIndexDocument: 'index.html',

      // Small trick to have React router working
      websiteErrorDocument: 'index.html',

      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    this.bucket.grantRead(new iam.AnyPrincipal());
  }
}
