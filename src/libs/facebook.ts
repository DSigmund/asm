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
    await this._database.InsertReach('facebook', fans)

    response = await request('https://graph.facebook.com/v3.3/' + this._pageid + '/posts?fields=id%2Ccreated_time%2Cmessage%2Creactions%2Ccomments&access_token=' + this._token)
    console.log(response.body)
    let posts = JSON.parse(response.body).data
    for (let index = 0; index < posts.length; index++) {
      const post = posts[index]
      if (!post.message) continue // No Message means, this is no real post
      let reactions = 0
      if (post.reactions && post.reactions.data) {
        console.log(post.reactions)
        reactions = post.reactions.data.length
      }
      let comments = 0
      if (post.comments && post.comments.data) {
        console.log(post.comments)
        comments = post.comments.data.length
      }
      await this._database.InsertPost('facebook', post.id, post.message, reactions, comments)
    }
  }

  public async GetReach (from: Date, to: Date): Promise<number> {
    return this._database.getReach('facebook', from, to)
  }

  public async GetPosts (from: Date, to: Date): Promise<Post[]> {
    return this._database.getPosts('facebook', from, to)
  }
}

export default Facebook
