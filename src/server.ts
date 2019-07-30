/*
 * Simple Web-Server (HTTPS)
 * Show Reports
 * provide raw-data as json
 */
import express from 'express'
import helmet from 'helmet'
import { readFileSync } from 'fs'
import * as https from 'https'
import * as path from "path"

import * as config from './config.json'
import Database from './libs/database'

const app: express.Application = express()

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

const sslOptions = {
  key: readFileSync(config.ssl.privatekey),
  cert: readFileSync(config.ssl.certificate)
}

const database: Database = new Database(config.database)

// tslint:disable-next-line: no-floating-promises
database.LoadDatabase()

app.set('port', config.port)
app.use(helmet())

app.get('/', function (req, res) {
  res.render('home')
})

app.get('/:channel', function (req, res) {
  try {
    let channel = database.GetChannelInfo(req.params.channel)
    res.json(channel)
  } catch (error) {
    res.status(500).json(error.toJSON())
  }
})

app.get('/:channel/posts', function (req, res) {
  try {
    let posts = database.getPosts(req.params.channel)
    res.json(posts)
  } catch (error) {
    res.status(500).json(error.toJSON())
  }
})

app.get('/report/week/:year/:kw', function (req, res) { // TODO: week as HTML
  try {
    res.json({})
  } catch (error) {
    res.status(500).json(error.toJSON())
  }
})

app.get('/report/month/:year/:month', function (req, res) { // TODO: month as HTML
  try {
    res.json({})
  } catch (error) {
    res.status(500).json(error.toJSON())
  }
})

app.get('/report/year/:year', function (req, res) { // TODO: year as HTML
  try {
    res.json({})
  } catch (error) {
    res.status(500).json(error.toJSON())
  }
})

https.createServer(sslOptions, app).listen(config.port , function () {
  console.log('Express server listening on port ' + config.port)
})
