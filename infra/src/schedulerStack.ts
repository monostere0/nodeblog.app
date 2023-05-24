import {
  Duration,
  StackProps,
  Stack,
  App,
  aws_events as events,
  aws_lambda_nodejs as aln,
  aws_events_targets as eventTargets,
} from 'aws-cdk-lib';

interface Props extends StackProps {
  lambdas: {
    createWeeklyArticles: aln.NodejsFunction;
  };
}

export default class SchedulerStack extends Stack {
  constructor(app: App, id: string, props?: Props) {
    super(app, id, props);

    const articleCreatorRule = new events.Rule(
      this,
      'NodeBlog-CreateArticlesCloudWatchRule',
      {
        schedule: events.Schedule.rate(Duration.days(7)),
      }
    );

    articleCreatorRule.addTarget(
      new eventTargets.LambdaFunction(props.lambdas.createWeeklyArticles)
    );
  }
}
