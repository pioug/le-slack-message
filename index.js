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

    core.debug(GITHUB);
    core.debug(JOB);

    const message = new IncomingWebhook(SLACK_WEBHOOK_URL);
    await message.send({
      attachments: [
        {
          title: process.env.GITHUB_WORKFLOW,
          color: {
            Success: "good",
            Cancelled: "warning",
            Failure: "danger"
          }[JOB.status]
        }
      ]
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
