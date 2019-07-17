"use strict";
/*
 * Load Config
 * Load Channels
 * Let every channel collect to database
 * write Log
 * send mail
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const facebook_1 = __importDefault(require("./libs/facebook"));
const config_json_1 = __importDefault(require("../config.json"));
const database_1 = __importDefault(require("./libs/database"));
let database = new database_1.default();
let fb = new facebook_1.default(database, config_json_1.default.channels.facebook.pageid, config_json_1.default.channels.facebook.token);
fb.CollectData();
//# sourceMappingURL=collect.js.map