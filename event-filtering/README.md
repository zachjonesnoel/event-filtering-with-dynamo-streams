# Avenger level threat with DynamoDB Streams and Lambda fn event-filtering

This is to demo how DynamoDB Streams works with Lambda functions event-filting with the filter patterns being to check on `dynamodb:put` and `dynamodb:delete` operations.

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless Application Model (AWS SAM) command line interface (CLI). It includes the following files and folders:

- `src` - Code for the application's Lambda function.
- `events` - Invocation events that you can use to invoke the function.
- `__tests__` - Unit tests for the application code. 
- `template.yaml` - A template that defines the application's AWS resources.

## Deploy the sample application

The AWS SAM CLI is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the AWS SAM CLI, you need the following tools:

* AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
* Node.js - [Install Node.js 14](https://nodejs.org/en/), including the npm package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The SAM template is parameterized to for the email attributes 
- `FromEmail` which needs to be an pre-verified identity on SES.
- `ToEmail` can be any valid email address as long as the SES is moved out of the Sandbox environment otherwise verify another identity on SES Sandbox and use it.
- `SESIdentityName` which is nothing but the SES identity (either domain or email address) this is for provisioning IAM policy with `ses:sendEmail` action.

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name event-filtering
```

## Resources
- [AWS announcement blog](https://aws.amazon.com/about-aws/whats-new/2021/11/aws-lambda-event-filtering-amazon-sqs-dynamodb-kinesis-sources/)
- [Trigger Lambda Functions with event filtering](https://dev.to/aws-builders/trigger-lambda-functions-with-event-filtering-2pnb)
- [Deep dive into Lambda event-filters for DyanmoDB](https://dev.to/aws-builders/deep-dive-into-lambda-event-filters-for-dyanmodb-320)

