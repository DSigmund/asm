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

async function run () {
  try {
    let database = new Database(config.database)
    await database.LoadDatabase()

    let fb = new Facebook(database, config.channels.facebook.pageid, config.channels.facebook.token)

    await fb.CollectData()

  } catch (err) {
    console.error(err)
  }
}

run().then(
  function (result) { console.log('Done') },
  function (error) { console.error(error) }
)
