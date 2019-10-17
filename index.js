"use strict";

const core = require("@actions/core");

async function run() {
  try {
    const status = core.getInput("status");
    core.debug(status);
    core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
