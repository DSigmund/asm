import Database from './database';
import Channel from './channel';
declare class Facebook extends Channel {
    private _pageid;
    private _token;
    constructor(database: Database, pageid: string, token: string);
    CollectData(): Promise<void>;
}
export default Facebook;
