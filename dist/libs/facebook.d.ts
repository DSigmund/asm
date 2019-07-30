import Database from './database';
import Channel from './channel';
declare class Facebook extends Channel {
    private _pageid;
    private _token;
    constructor(database: Database, pageid: string, token: string);
    CollectData(): Promise<void>;
    GetChannelInfo(from: Date, to: Date): Promise<any>;
    GetPosts(from: Date, to: Date): Promise<Post[]>;
}
export default Facebook;
