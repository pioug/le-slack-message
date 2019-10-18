"use strict";

const core = require("@actions/core");
const { IncomingWebhook } = require("@slack/webhook");

async function run() {
  try {
    const GITHUB = JSON.parse(core.getInput("GITHUB", { required: true }));
    const JOB = JSON.parse(core.getInput("JOB", { required: true }));
    const SLACK_WEBHOOK_URL = core.getInput("SLACK_WEBHOOK_URL", {
      required: true
    });

    const ACTION_NAME = core.getInput("ACTION_NAME");

    core.debug(GITHUB);
    core.debug(JOB);

    const message = new IncomingWebhook(SLACK_WEBHOOK_URL);
    await message.send({
      attachments: [
        {
          title: `${ACTION_NAME} in <${GITHUB.event.head_commit.url}/checks|${GITHUB.workflow}>`,
          color: {
            Success: "good",
            Cancelled: "warning",
            Failure: "danger"
          }[JOB.status],
          fields: [
            {
              value: `${GITHUB.event.head_commit.message.split("\n")[0]} _(<${
                GITHUB.event.head_commit.url
              }|${GITHUB.ref.replace('refs/heads/', '')}@${GITHUB.event.head_commit.id.substring(0, 6)}> by ${
                GITHUB.event.head_commit.author.username
              })_`
            }
          ]
        }
      ]
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
