"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const fs_1 = require("fs");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const keyword = core_1.getInput("keyword");
            const comment = yield getComment();
            const found = findMatch(comment, keyword);
            console.log("comvent search complete, result: ", found);
            core_1.setOutput("comvent", found ? "found" : "");
        }
        catch (error) {
            core_1.setFailed(error.message);
        }
    });
}
function getComment() {
    const path = process.env.GITHUB_EVENT_PATH;
    if (!path)
        throw "GITHUB_EVENT_PATH not found";
    const data = fs_1.readFileSync(path);
    const event = JSON.parse(data.toString());
    const msg = event.comment.body;
    if (!msg)
        throw "Comment body not found";
    return msg;
}
function findMatch(comment, keyword) {
    let regexp = new RegExp(keyword);
    return regexp.test(comment);
}
run();
