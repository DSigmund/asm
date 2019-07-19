"use strict";
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
const moment_1 = __importDefault(require("moment"));
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
class Database {
    constructor(databasePath) {
        // tslint:disable-next-line: tsr-detect-non-literal-fs-filename
        this._writeFile = promisify(fs.writeFile);
        // tslint:disable-next-line: tsr-detect-non-literal-fs-filename
        this._readFile = promisify(fs.readFile);
        this._path = databasePath;
    }
    LoadDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            this._reach = yield this._readFile(path.join(this._path, 'reach.json'));
            this._posts = yield this._readFile(path.join(this._path, 'posts.json'));
        });
    }
    InsertReach(channel, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let yearKW = moment_1.default().format('YYYY-WW');
            let now = moment_1.default().format('YYYY-MM-DD');
            this.createChannelIfNeeded(channel);
            this._reach[channel][yearKW] = {
                timestamp: now,
                data: data
            };
            yield this._writeFile(path.join(this._path, 'reach.json'), JSON.stringify(this._reach));
        });
    }
    createChannelIfNeeded(channel) {
        if (!this._reach[channel])
            this._reach[channel] = {};
    }
    InsertPost(channel, id, title, reactions, comments) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(channel + ' Post : ' + id + ': ' + title.substring(0, 25) + ' > Reactions: ' + reactions + ' > Comments: ' + comments);
            // TODO: into database with timestamp
        });
    }
    getPosts(channel, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    getReach(channel, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map