import Database from './database'

// Interface for other channels
/*
 * Constructor (database, config)
 * CollectData () From API to Database
 * GetData (from, until)
 */
abstract class Channel {
  protected _database: Database
  constructor (database: Database) {
    this._database = database
  }
  public async abstract CollectData (): Promise<void>
}

export default Channel
