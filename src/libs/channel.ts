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
  public async abstract GetChannelInfo (from: Date, to: Date): Promise<any>
  public async abstract GetPosts (from: Date, to: Date): Promise<Post[]>
}

export default Channel
