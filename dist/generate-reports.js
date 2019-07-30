"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Use pug to generate html reports and save them under config.reports
const pug = __importStar(require("pug"));
const moment_1 = __importDefault(require("moment"));
const database_1 = __importDefault(require("./libs/database"));
const config = __importStar(require("./config.json"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const now = moment_1.default();
const kw = now.format('WW');
const month = now.format('MM');
const year = now.format('YYYY');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let database = new database_1.default(config.database);
            yield database.LoadDatabase();
            let weekData = database.GetWeekData(now);
            // let monthData: any = database.GetMonthData(year, month)
            // let yearData: any = database.GetYearData(year)
            let weekFilename = path.join(config.reports, 'week', year + '-' + kw + '.html');
            // let monthFilename = path.join(config.reports, 'month', year + '-' + month + '.html')
            // let yearFilename = path.join(config.reports, 'year', year + '.html')
            let weekHTML = pug.renderFile(path.join(__dirname, '../views/week.pug'), weekData);
            // let monthHTML = pug.renderFile('../views/month.pug', monthData)
            // let yearHTML = pug.renderFile('../views/year.pug', yearData)
            // tslint:disable-next-line: tsr-detect-non-literal-fs-filename
            fs.writeFileSync(weekFilename, weekHTML, 'utf8');
            // tslint:disable-next-line: tsr-detect-non-literal-fs-filename
            // fs.writeFileSync(monthFilename, monthHTML, 'utf8')
            // tslint:disable-next-line: tsr-detect-non-literal-fs-filename
            // fs.writeFileSync(yearFilename, yearHTML, 'utf8')
        }
        catch (err) {
            console.error(err);
        }
    });
}
run().then(function (result) { console.log('Done'); }, function (error) { console.error(error); });
//# sourceMappingURL=generate-reports.js.map