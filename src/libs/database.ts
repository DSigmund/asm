
class Database {
  constructor (path: string) {
    // TODO: load json files from path.
  }

  public async InsertReach (channel: string, fans: any): Promise<void> {
    console.log(channel + ' Reach: ' + fans)
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

  private getToday (): string {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1 // January is 0!

    let yyyy = today.getFullYear()
    let day = ''
    if (dd < 10) {
      day = '0' + dd
    } else {
      day = dd.toString()
    }
    let month = ''
    if (mm < 10) {
      month = '0' + mm
    } else {
      month = mm.toString()
    }
    return yyyy + '-' + month + '-' + day
  }
}

export default Database
