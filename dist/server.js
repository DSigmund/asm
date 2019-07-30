"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Simple Web-Server (HTTPS)
 * Show Reports
 * provide raw-data as json
 */
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const fs_1 = require("fs");
const https = __importStar(require("https"));
const path = __importStar(require("path"));
const config = __importStar(require("./config.json"));
const database_1 = __importDefault(require("./libs/database"));
const app = express_1.default();
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
const sslOptions = {
    key: fs_1.readFileSync(config.ssl.privatekey),
    cert: fs_1.readFileSync(config.ssl.certificate)
};
const database = new database_1.default(config.database);
// tslint:disable-next-line: no-floating-promises
database.LoadDatabase();
app.set('port', config.port);
app.use(helmet_1.default());
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/:channel', function (req, res) {
    try {
        let channel = database.GetChannelInfo(req.params.channel);
        res.json(channel);
    }
    catch (error) {
        res.status(500).json(error.toJSON());
    }
});
app.get('/:channel/posts', function (req, res) {
    try {
        let posts = database.getPosts(req.params.channel);
        res.json(posts);
    }
    catch (error) {
        res.status(500).json(error.toJSON());
    }
});
app.get('/report/week/:year/:kw', function (req, res) {
    try {
        res.json({});
    }
    catch (error) {
        res.status(500).json(error.toJSON());
    }
});
app.get('/report/month/:year/:month', function (req, res) {
    try {
        res.json({});
    }
    catch (error) {
        res.status(500).json(error.toJSON());
    }
});
app.get('/report/year/:year', function (req, res) {
    try {
        res.json({});
    }
    catch (error) {
        res.status(500).json(error.toJSON());
    }
});
https.createServer(sslOptions, app).listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});
//# sourceMappingURL=server.js.map