// Use pug to generate html reports and save them under config.reports
import * as pug from 'pug'
import moment from 'moment'
import Database from './libs/database'
import * as config from './config.json'
import * as fs from 'fs'
import * as path from 'path'

const now: any = moment()

const kw: any = now.format('WW')
const month: any = now.format('MM')
const year: any = now.format('YYYY')

let database: Database = new Database(config.database)

// tslint:disable-next-line: no-floating-promises
database.LoadDatabase()

let weekData: any = database.GetWeekData(year, kw)
let monthData: any = database.GetMonthData(year, month)
let yearData: any = database.GetYearData(year)

let weekFilename = path.join(config.reports, 'week', year + '-' + kw + '.html')
let monthFilename = path.join(config.reports, 'month', year + '-' + month + '.html')
let yearFilename = path.join(config.reports, 'year', year + '.html')

let weekHTML = pug.renderFile('../views/week.pug', weekData)
let monthHTML = pug.renderFile('../views/month.pug', monthData)
let yearHTML = pug.renderFile('../views/year.pug', yearData)

// tslint:disable-next-line: tsr-detect-non-literal-fs-filename
fs.writeFileSync(weekFilename, weekHTML, 'utf8')
// tslint:disable-next-line: tsr-detect-non-literal-fs-filename
fs.writeFileSync(monthFilename, monthHTML, 'utf8')
// tslint:disable-next-line: tsr-detect-non-literal-fs-filename
fs.writeFileSync(yearFilename, yearHTML, 'utf8')
