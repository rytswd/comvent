import * as core from "@actions/core";
import axios from "axios";
import * as fs from "fs";

async function run() {
  try {
    const keyword = core.getInput("keyword");
    const comment = await getComment();

    const found = findMatch(comment, keyword);
    core.setOutput("comvent", found ? "found" : "");
  } catch (error) {
    core.setFailed(error.message);
  }
}

function getComment(): string {
  const path = process.env.GITHUB_EVENT_PATH;
  if (!path) throw "GITHUB_EVENT_PATH not found";

  const data = fs.readFileSync(path);
  const event = JSON.parse(data.toString());
  const msg = event.comment.body;

  if (!msg) throw "Comment body not found";

  return msg;
}

function findMatch(comment: string, keyword: string): boolean {
  let result = false;
  let regexp = new RegExp(keyword);

  return regexp.test(comment);
}

// async function sendFeedbackToPR() {
//   const path = process.env.GITHUB_EVENT_PATH;
//   if (!path) {
//     console.log("GITHUB_EVENT_PATH not found");
//     return;
//   }
//   const token = process.env.GITHUB_TOKEN;
//   if (!path) {
//     console.log("GITHUB_TOKEN");
//     return;
//   }

//   const data = fs.readFileSync(path);
//   const event = JSON.parse(data.toString());

//   axios({
//     method: "post",
//     baseURL: event.issue.comments_url,
//     headers: {
//       Authorization: "token " + token,
//       "Content-Type": "application/json"
//     },
//     data: {
//       body: "You said: " + event.comment.body
//     }
//   }).then(res => {
//     core.setOutput("result", "sent correctly");
//   });

//   console.log("You said: " + event.comment.body);
//   console.log("Whole event: %o", event);

//   core.setOutput("env", `env: ${process.env}`);
//   core.setOutput("comment", `comment: ${process.env.comment}`);
// }

run();
