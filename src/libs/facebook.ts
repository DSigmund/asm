import Database from './database'
import Channel from './channel'

const request = require('async-request')

class Facebook extends Channel {

  private _pageid: string
  private _token: string

  constructor (database: Database, pageid: string, token: string) {
    super(database)
    this._pageid = pageid
    this._token = token
  }
  public async CollectData (): Promise<void> {
    let response = await request('https://graph.facebook.com/v3.3/' + this._pageid + '/?fields=fan_count&access_token=' + this._token)
    let fans = JSON.parse(response.body).fan_count
    await this._database.InsertChannelInfo('facebook', { fans: fans }, 'fans')

    response = await request('https://graph.facebook.com/v3.3/' + this._pageid + '/posts?fields=id,permalink_url,created_time,message,reactions.summary(total_count),comments.summary(total_count)&access_token=' + this._token)
    let posts = JSON.parse(response.body).data
    for (let index = 0; index < posts.length; index++) {
      const post = posts[index]
      if (!post.message) continue // No Message means, this is no real post
      let reactions = post.reactions.summary.total_count
      let comments = post.comments.summary.total_count
      await this._database.InsertPost('facebook', post.id, post.created_time, post.message, post.permalink_url, { reactions: reactions, comments: comments }, 'reactions')
    }
  }
}

export default Facebook
