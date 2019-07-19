declare class Database {
    private _path;
    private _reach;
    private _posts;
    private _writeFile;
    private _readFile;
    constructor(databasePath: string);
    LoadDatabase(): Promise<void>;
    InsertReach(channel: string, data: any): Promise<void>;
    private createChannelIfNeeded;
    InsertPost(channel: string, id: string, title: string, reactions: number, comments: number): Promise<void>;
    getPosts(channel: string, from: Date, to: Date): Promise<Post[]>;
    getReach(channel: string, from: Date, to: Date): Promise<number>;
}
export default Database;
