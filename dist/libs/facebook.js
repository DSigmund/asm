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
const channel_1 = __importDefault(require("./channel"));
const request = require('async-request');
class Facebook extends channel_1.default {
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
            response = yield request('https://graph.facebook.com/v3.3/' + this._pageid + '/posts?fields=id%2Ccreated_time%2Cmessage%2Creactions%2Ccomments&access_token=' + this._token);
            console.log(response.body);
            let posts = JSON.parse(response.body).data;
            for (let index = 0; index < posts.length; index++) {
                const post = posts[index];
                if (!post.message)
                    continue; // No Message means, this is no real post
                let reactions = 0;
                if (post.reactions && post.reactions.data) {
                    console.log(post.reactions);
                    reactions = post.reactions.data.length;
                }
                let comments = 0;
                if (post.comments && post.comments.data) {
                    console.log(post.comments);
                    comments = post.comments.data.length;
                }
                yield this._database.InsertPost('facebook', post.id, post.message, reactions, comments);
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