/*
 * Load Config
 * Load Channels
 * Let every channel collect to database
 * write Log
 * send mail
 */

import Facebook from './libs/facebook'
import config from './config.json'
import Database from './libs/database'

let database = new Database(config.database)

let fb = new Facebook(database, config.channels.facebook.pageid, config.channels.facebook.token)

fb.CollectData()
