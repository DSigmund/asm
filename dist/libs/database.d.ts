declare class Database {
    private _path;
    private _channel;
    private _posts;
    private _writeFile;
    private _readFile;
    constructor(databasePath: string);
    LoadDatabase(): Promise<void>;
    SaveDatabase(): Promise<void>;
    InsertChannelInfo(channel: string, data: any): Promise<void>;
    private createChannelIfNeeded;
    InsertPost(channel: string, id: string, create: string, title: string, link: string, data: any): Promise<void>;
    getPosts(channel: string, from: Date, to: Date): Promise<Post[]>;
    GetChannelInfo(channel: string, from: Date, to: Date): Promise<number>;
}
export default Database;
