import * as core from "@actions/core";

async function run() {
  try {
    const myInput = core.getInput("keyword");
    core.debug(`Hello ${myInput}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function parse() {
  core.debug(`env: ${process.env}`);
}

run();
