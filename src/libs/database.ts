import moment from 'moment'
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

class Database {
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

  public async InsertChannelInfo (channel: string, data: any, main: string): Promise<void> {
    let yearKW: any = moment().format('YYYY-WW')
    let now: any = moment().format('YYYY-MM-DD')

    this.createChannelIfNeeded(channel)

    this._channel[channel][yearKW] = {
      timestamp: now,
      data: data,
      main: main
    }
  }
  private createChannelIfNeeded (channel: string): void {
    if (!this._channel[channel]) this._channel[channel] = {}
    if (!this._posts[channel]) this._posts[channel] = {}
  }

  public async InsertPost (channel: string, id: string, create: string, title: string, link: string, data: any, main: string): Promise<void> {
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
      data: data,
      main: main
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

  public GetYearData (year: any): any {
    throw new Error("Method not implemented.");
  }
  public GetMonthData (year: any, month: any): any {
    throw new Error("Method not implemented.");
  }
  public GetWeekData (moment: moment.Moment): any {
    let yearKW: any = moment.format('YYYY-WW')
    let lastyearKW: any = moment.clone().subtract(1, 'week').format('YYYY-WW')
    let data: any = {}
    data.year = moment.format('YYYY')
    data.kw = moment.format('WW')
    data.creation = moment.format('DD.MM.YYYY')
    data.title = 'Weekly :: ' + moment.format('YYYY / WW')
    data.channels = {}
    let self = this
    Object.keys(self._channel).forEach(function (c) {
      let channel = self._channel[c]
      data.channels[c] = {
        name: c,
        now: channel[yearKW].data,
        last: channel[lastyearKW].data,
        diff: self.getdiff(channel[yearKW].data, channel[lastyearKW].data),
        main: channel[yearKW].data.main
      }
      // TODO: add posts
    })
    return data
  }
  private getdiff (thisWeek: any, lastWeek: any): any {
    let diff: any = {}
    Object.keys(thisWeek).forEach(function (v) {
      if(v !== 'main') {
        diff[v] = thisWeek[v] - lastWeek[v]
      }
    })
    return diff
  }
}

export default Database
