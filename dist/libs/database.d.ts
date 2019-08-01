import moment from 'moment';
declare class Database {
    private _path;
    private _channel;
    private _posts;
    private _writeFile;
    private _readFile;
    constructor(databasePath: string);
    LoadDatabase(): Promise<void>;
    SaveDatabase(): Promise<void>;
    getPosts(channel: string): any;
    InsertChannelInfo(channel: string, data: any, main: string): Promise<void>;
    private createChannelIfNeeded;
    InsertPost(channel: string, id: string, create: string, title: string, link: string, data: any, main: string): Promise<void>;
    private postsToArray;
    getPostsInWeek(channel: string, time: moment.Moment): any;
    getTopPosts(channel: string, upTo: moment.Moment): any;
    GetChannelInfo(channel: string, from?: Date, to?: Date): Promise<any>;
    GetYearData(year: any): any;
    GetMonthData(year: any, month: any): any;
    GetWeekData(moment: moment.Moment): any;
    private getdiff;
}
export default Database;
