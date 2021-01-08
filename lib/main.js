"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const core = __importStar(require("@actions/core"));
const process_fetch_1 = require("./step-0-prerequisites/process-fetch");
const process_prep_1 = require("./step-1-config-prep/process-prep");
const process_check_1 = require("./step-2-check-comment/process-check");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            core.debug('Getting input from Action setup');
            const token = core.getInput('token');
            const configPath = core.getInput('config-path');
            const configCheckOnly = core.getInput('config-check-only');
            core.debug('Getting config file for further processing');
            const f = yield process_fetch_1.fetch(token, configPath);
            core.debug('Parse config and prepare for comment event check');
            const config = process_prep_1.prepare(f);
            // If only config check is to be done, return early
            if (configCheckOnly !== '') {
                core.debug('config-check-only flag found, skipping comment handling');
                return;
            }
            core.debug('Starting comment check by iterating comvent config');
            process_check_1.checkComment(config);
            core.debug('comvent complete');
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
