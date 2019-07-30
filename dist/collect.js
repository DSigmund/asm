"use strict";
/*
 * Load Config
 * Load Channels
 * Let every channel collect to database
 * write Log
 * send mail
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const facebook_1 = __importDefault(require("./libs/facebook"));
const config_json_1 = __importDefault(require("./config.json"));
const database_1 = __importDefault(require("./libs/database"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let database = new database_1.default(config_json_1.default.database);
            yield database.LoadDatabase();
            let fb = new facebook_1.default(database, config_json_1.default.channels.facebook.pageid, config_json_1.default.channels.facebook.token);
            yield fb.CollectData();
            yield database.SaveDatabase();
        }
        catch (err) {
            console.error(err);
        }
    });
}
run().then(function (result) { console.log('Done'); }, function (error) { console.error(error); });
//# sourceMappingURL=collect.js.map