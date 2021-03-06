declare class Database {
    InsertReach(channel: string, fans: any): Promise<void>;
    InsertPost(channel: string, id: string, title: string, reactions: number, comments: number): Promise<void>;
    getPosts(channel: string, from: Date, to: Date): Promise<Post[]>;
    getReach(channel: string, from: Date, to: Date): Promise<number>;
}
export default Database;
