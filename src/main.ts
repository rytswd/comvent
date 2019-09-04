import { getInput, setOutput, setFailed } from "@actions/core";
import { readFileSync } from "fs";

async function run() {
  try {
    const keyword = getInput("keyword");
    const comment = await getComment();

    const found = findMatch(comment, keyword);
    console.log("comvent search complete, result: ", found);
    setOutput("comvent", found ? "found" : "");
  } catch (error) {
    setFailed(error.message);
  }
}

function getComment(): string {
  const path = process.env.GITHUB_EVENT_PATH;
  if (!path) throw "GITHUB_EVENT_PATH not found";

  const data = readFileSync(path);
  const event = JSON.parse(data.toString());
  const msg = event.comment.body;

  if (!msg) throw "Comment body not found";

  return msg;
}

function findMatch(comment: string, keyword: string): boolean {
  let regexp = new RegExp(keyword);

  return regexp.test(comment);
}

run();
