"use strict";

const core = require("@actions/core");
const { IncomingWebhook } = require("@slack/webhook");

async function run() {
  try {
    const GITHUB = core.getInput("GITHUB", { required: true });
    const JOB = core.getInput("JOB", { required: true });
    const SLACK_WEBHOOK_URL = core.getInput("SLACK_WEBHOOK_URL", {
      required: true
    });

    core.debug(GITHUB);
    core.debug(JOB);

    const message = new IncomingWebhook(SLACK_WEBHOOK_URL);
    await message.send({
      text: "Merci"
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
