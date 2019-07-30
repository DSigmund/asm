/*
 * Simple Web-Server (HTTPS)
 * Show Reports
 * provide raw-data as json
 */
// import helmet from 'helmet'
import express from 'express'
import helmet from 'helmet'
import { readFileSync } from 'fs'
import * as https from 'https'

import * as config from './config.json'
import Database from './libs/database'

const app: express.Application = express()

const sslOptions = {
  key: readFileSync(config.ssl.privatekey),
  cert: readFileSync(config.ssl.certificate)
}

const database: Database = new Database(config.database)

// tslint:disable-next-line: no-floating-promises
database.LoadDatabase()

app.set('port', config.port)
app.use(helmet())

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

app.get('/:channel/:yearKW', function (req, res) { // TODO: raw data for channel for time
  try {
    res.json({})
  } catch (error) {
    res.status(500).json(error.toJSON())
  }
})

app.get('/week/:year/:kw', function (req, res) { // TODO: week as HTML
  try {
    res.json({})
  } catch (error) {
    res.status(500).json(error.toJSON())
  }
})

app.get('/month/:year/:month', function (req, res) { // TODO: month as HTML
  try {
    res.json({})
  } catch (error) {
    res.status(500).json(error.toJSON())
  }
})

app.get('/year/:year', function (req, res) { // TODO: year as HTML
  try {
    res.json({})
  } catch (error) {
    res.status(500).json(error.toJSON())
  }
})

https.createServer(sslOptions, app).listen(config.port , function () {
  console.log('Express server listening on port ' + config.port)
})
