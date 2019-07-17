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
const request = require('async-request');
class Facebook extends Channel {
    constructor(database, pageid, token) {
        super(database);
        this._pageid = pageid;
        this._token = token;
    }
    CollectData() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request('https://graph.facebook.com/v3.3/' + this._pageid + '/?fields=fan_count&access_token=' + this._token);
            let fans = JSON.parse(response.body).fan_count;
            yield this._database.InsertReach('facebook', fans);
            response = yield request('https://graph.facebook.com/v3.3/' + this._pageid + '/posts?fields=id,created_time,message,reactions,comments&access_token=' + this._token);
            let posts = JSON.parse(response.body).data;
            for (let index = 0; index < posts.length; index++) {
                const post = posts[index];
                yield this._database.InsertPost('facebook', post.id, post.message, post.reactions.data.count, post.comments.data.count);
            }
        });
    }
    GetReach(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._database.getReach('facebook', from, to);
        });
    }
    GetPosts(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._database.getPosts('facebook', from, to);
        });
    }
}
exports.default = Facebook;
//# sourceMappingURL=facebook.js.map