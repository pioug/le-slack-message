> Send job results on Slack via Incoming Webhooks

### Input parameters

- `ACTION_NAME`: Name of the action for a more descriptive message.
- `JOB`: JSON-stringified `job` variable (see [context](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/contexts-and-expression-syntax-for-github-actions#contexts)). Must be passed to output the actual status of the job.
- `SLACK_WEBHOOK_URL`: URL of the Incoming Webhook provided by Slack". Read [Sending messages using Incoming Webhooks
  ](https://api.slack.com/messaging/webhooks) to configure Slack.

### Example of workflow

```yml
on: push
name: Test something
jobs:
  build:
    name: Run scripts
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - run: npm test
      - run: npm ci
      - uses: pioug/le-slack-message@v1.0.0
        with:
          ACTION_NAME: Run test scripts
          JOB: ${{ toJson(job) }}
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Example of output

![Example of output](https://github.com/pioug/le-slack-message/blob/master/example-output.png)
