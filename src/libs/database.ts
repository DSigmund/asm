import moment from 'moment'
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

class Database {
  GetYearData (year: any) {
    throw new Error("Method not implemented.");
  }
  GetMonthData (year: any, month: any) {
    throw new Error("Method not implemented.");
  }
  GetWeekData (year: any, kw: any) {
    throw new Error("Method not implemented.");
  }
  private _path: string
  private _channel: any
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
    this._channel = await this._readFile(path.join(this._path, 'channel.json'), 'utf8')
    this._channel = JSON.parse(this._channel)
    this._posts = await this._readFile(path.join(this._path, 'posts.json'), 'utf8')
    this._posts = JSON.parse(this._posts)
  }

  public async SaveDatabase (): Promise<void> {
    await this._writeFile(path.join(this._path, 'channel.json'), JSON.stringify(this._channel), 'utf8')
    await this._writeFile(path.join(this._path, 'posts.json'), JSON.stringify(this._posts), 'utf8')
  }

  public async InsertChannelInfo (channel: string, data: any): Promise<void> {
    let yearKW: any = moment().format('YYYY-WW')
    let now: any = moment().format('YYYY-MM-DD')

    this.createChannelIfNeeded(channel)

    this._channel[channel][yearKW] = {
      timestamp: now,
      data: data
    }
  }
  private createChannelIfNeeded (channel: string): void {
    if (!this._channel[channel]) this._channel[channel] = {}
    if (!this._posts[channel]) this._posts[channel] = {}
  }

  public async InsertPost (channel: string, id: string, create: string, title: string, link: string, data: any): Promise<void> {
    let yearKW: any = moment().format('YYYY-WW')
    let now: any = moment().format('YYYY-MM-DD')

    this.createChannelIfNeeded(channel)

    if (!this._posts[channel][id]) {
      this._posts[channel][id] = {
        id: id,
        create: create,
        title: title,
        link: link,
        data: {}
      }
    }

    this._posts[channel][id].data[yearKW] = {
      timestamp: now,
      data: data
    }
  }

  public getPosts (channel: string, from?: Date, to?: Date): Promise<any> {
    if (!from && !to) {
      return this._posts[channel]
    } else {
      throw new Error('Method not fully implemented.')
    }
  }
  public GetChannelInfo (channel: string, from?: Date, to?: Date): Promise<any> {
    if (!from && !to) {
      return this._channel[channel]
    } else {
      throw new Error('Method not fully implemented.')
    }
  }
}

export default Database
