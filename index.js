"use strict";

const core = require("@actions/core");

async function run() {
  try {
    const github = core.getInput("github");
    const job = core.getInput("job");
    const steps = core.getInput("steps");
    core.debug(github);
    core.debug(job);
    core.debug(steps);
    core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
