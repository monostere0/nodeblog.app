import {
  App,
  Stack,
  StackProps,
  aws_s3 as s3,
  aws_lambda as lambda,
  RemovalPolicy,
} from 'aws-cdk-lib';

interface Props extends StackProps {
  bucketName: string;
  accessingLambdas: Array<lambda.Function>;
}

export default class S3ImagesStack extends Stack {
  bucket: s3.Bucket;

  constructor(app: App, id: string, props: Props) {
    super(app, id, props);

    this.bucket = new s3.Bucket(this, 'NodeBlog-S3ImagesStack', {
      publicReadAccess: false,
      bucketName: props.bucketName,
      versioned: false,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    props.accessingLambdas.forEach((lambda) =>
      this.bucket.grantReadWrite(lambda)
    );
  }
}
