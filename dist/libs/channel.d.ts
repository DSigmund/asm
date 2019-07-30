import Database from './database';
declare abstract class Channel {
    protected _database: Database;
    constructor(database: Database);
    abstract CollectData(): Promise<void>;
}
export default Channel;
