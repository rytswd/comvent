import * as core from "@actions/core";

async function run() {
  try {
    const myInput = core.getInput("keyword");
    core.debug(`Hi ${myInput}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function parse() {
  core.debug(`env: ${process.env}`);
  core.debug(`comment: ${process.env.comment}`);
}

run();
