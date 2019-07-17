"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = require('sqlite3').verbose();
class Database {
    constructor(path) {
        this._database = new sqlite3.Database(path);
    }
    InsertReach(channel, fans) {
        return __awaiter(this, void 0, void 0, function* () {
            this._database.run('INSERT INTO reach (Channel, TimeStamp, Reach) VALUES(?, ?, ?)', channel, this.getToday(), fans);
            console.log(channel + ' Reach: ' + fans);
        });
    }
    InsertPost(channel, id, title, reactions, comments) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(channel + ' Post : ' + id + ': ' + title.substring(0, 25) + ' > Reactions: ' + reactions + ' > Comments: ' + comments);
            // TODO: into database with timestamp
        });
    }
    getPosts(channel, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getReach(channel, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getToday() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        let day = '';
        if (dd < 10) {
            day = '0' + dd;
        }
        else {
            day = dd.toString();
        }
        let month = '';
        if (mm < 10) {
            month = '0' + mm;
        }
        else {
            month = mm.toString();
        }
        return yyyy + '-' + month + '-' + day;
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map