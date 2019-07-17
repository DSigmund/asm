import Database from './database';
declare abstract class Channel {
    protected _database: Database;
    constructor(database: Database);
    abstract CollectData(): Promise<void>;
    abstract GetReach(from: Date, to: Date): Promise<number>;
    abstract GetPosts(from: Date, to: Date): Promise<Post[]>;
}
export default Channel;
