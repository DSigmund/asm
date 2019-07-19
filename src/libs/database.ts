import moment from 'moment'
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

class Database {
  private _path: string
  private _reach: any
  private _posts: any
  private _writeFile: any
  private _readFile: any
  constructor (databasePath: string) {
    // tslint:disable-next-line: tsr-detect-non-literal-fs-filename
    this._writeFile = promisify(fs.writeFile)
    // tslint:disable-next-line: tsr-detect-non-literal-fs-filename
    this._readFile = promisify(fs.readFile)

    this._path = databasePath
  }
  public async LoadDatabase (): Promise<void> {
    this._reach = await this._readFile(path.join(this._path, 'reach.json'))
    this._posts = await this._readFile(path.join(this._path, 'posts.json'))
  }

  public async InsertReach (channel: string, data: any): Promise<void> {
    let yearKW: any = moment().format('YYYY-WW')
    let now: any = moment().format('YYYY-MM-DD')

    this.createChannelIfNeeded(channel)

    this._reach[channel][yearKW] = {
      timestamp: now,
      data: data
    }

    await this._writeFile(path.join(this._path, 'reach.json'), JSON.stringify(this._reach))
  }
  private createChannelIfNeeded (channel: string): void {
    if (!this._reach[channel]) this._reach[channel] = {}
  }

  public async InsertPost (channel: string, id: string, title: string, reactions: number, comments: number): Promise<void> {
    console.log(channel + ' Post : ' + id + ': ' + title.substring(0,25) + ' > Reactions: ' + reactions + ' > Comments: ' + comments)
    // TODO: into database with timestamp

  }

  public async getPosts (channel: string, from: Date, to: Date): Promise<Post[]> {
    throw new Error('Method not implemented.')
  }
  public async getReach (channel: string, from: Date, to: Date): Promise<number> {
    throw new Error('Method not implemented.')
  }
}

export default Database
