import Database from './database';
declare abstract class Channel {
    protected _database: Database;
    constructor(database: Database);
    abstract CollectData(): Promise<void>;
    abstract GetChannelInfo(from: Date, to: Date): Promise<any>;
    abstract GetPosts(from: Date, to: Date): Promise<Post[]>;
}
export default Channel;
