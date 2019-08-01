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
            this._channel = yield this._readFile(path.join(this._path, 'channel.json'), 'utf8');
            this._channel = JSON.parse(this._channel);
            this._posts = yield this._readFile(path.join(this._path, 'posts.json'), 'utf8');
            this._posts = JSON.parse(this._posts);
        });
    }
    SaveDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._writeFile(path.join(this._path, 'channel.json'), JSON.stringify(this._channel), 'utf8');
            yield this._writeFile(path.join(this._path, 'posts.json'), JSON.stringify(this._posts), 'utf8');
        });
    }
    InsertChannelInfo(channel, data, main) {
        return __awaiter(this, void 0, void 0, function* () {
            let yearKW = moment_1.default().format('YYYY-WW');
            let now = moment_1.default().format('YYYY-MM-DD');
            this.createChannelIfNeeded(channel);
            this._channel[channel][yearKW] = {
                timestamp: now,
                data: data,
                main: main
            };
        });
    }
    createChannelIfNeeded(channel) {
        if (!this._channel[channel])
            this._channel[channel] = {};
        if (!this._posts[channel])
            this._posts[channel] = {};
    }
    InsertPost(channel, id, create, title, link, data, main) {
        return __awaiter(this, void 0, void 0, function* () {
            let yearKW = moment_1.default().format('YYYY-WW');
            let now = moment_1.default().format('YYYY-MM-DD');
            this.createChannelIfNeeded(channel);
            if (!this._posts[channel][id]) {
                this._posts[channel][id] = {
                    id: id,
                    create: create,
                    title: title,
                    link: link,
                    data: {}
                };
            }
            this._posts[channel][id].data[yearKW] = {
                timestamp: now,
                data: data,
                main: main
            };
        });
    }
    getPosts(channel, from, to) {
        if (!from && !to) {
            return this._posts[channel];
        }
        else {
            throw new Error('Method not fully implemented.');
        }
    }
    GetChannelInfo(channel, from, to) {
        if (!from && !to) {
            return this._channel[channel];
        }
        else {
            throw new Error('Method not fully implemented.');
        }
    }
    GetYearData(year) {
        throw new Error("Method not implemented.");
    }
    GetMonthData(year, month) {
        throw new Error("Method not implemented.");
    }
    GetWeekData(moment) {
        let yearKW = moment.format('YYYY-WW');
        let lastyearKW = moment.clone().subtract(1, 'week').format('YYYY-WW');
        let data = {};
        data.year = moment.format('YYYY');
        data.kw = moment.format('WW');
        data.creation = moment.format('DD.MM.YYYY');
        data.title = 'Weekly :: ' + moment.format('YYYY / WW');
        data.channels = {};
        let self = this;
        Object.keys(self._channel).forEach(function (c) {
            let channel = self._channel[c];
            data.channels[c] = {
                name: c,
                now: channel[yearKW].data,
                last: channel[lastyearKW].data,
                diff: self.getdiff(channel[yearKW].data, channel[lastyearKW].data),
                main: channel[yearKW].data.main
            };
            // TODO: add posts
        });
        return data;
    }
    getdiff(thisWeek, lastWeek) {
        let diff = {};
        Object.keys(thisWeek).forEach(function (v) {
            if (v !== 'main') {
                diff[v] = thisWeek[v] - lastWeek[v];
            }
        });
        return diff;
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map