"use strict";

const core = require("@actions/core");
const { IncomingWebhook } = require("@slack/webhook");

async function run() {
  try {
    const GITHUB_EVENT = require(process.env.GITHUB_EVENT_PATH);
    const GITHUB_WORKFLOW = process.env.GITHUB_WORKFLOW;
    const ACTION_NAME = core.getInput("ACTION_NAME");
    const JOB = JSON.parse(core.getInput("JOB", { required: true }));
    const SLACK_WEBHOOK_URL = core.getInput("SLACK_WEBHOOK_URL", {
      required: true
    });

    const message = new IncomingWebhook(SLACK_WEBHOOK_URL);
    await message.send({
      attachments: [
        {
          title: `${ACTION_NAME} in <${GITHUB_EVENT.head_commit.url}/checks|${GITHUB_WORKFLOW}>: ${JOB.status}`,
          color: {
            Success: "good",
            Cancelled: "warning",
            Failure: "danger"
          }[JOB.status],
          fields: [
            {
              value: `${GITHUB_EVENT.head_commit.message.split("\n")[0]} _(<${
                GITHUB_EVENT.head_commit.url
              }|${GITHUB_EVENT.ref.replace(
                "refs/heads/",
                ""
              )}@${GITHUB_EVENT.head_commit.id.substring(0, 6)}> by ${
                GITHUB_EVENT.head_commit.author.username
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
