export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export class Log {
    public level: LogSeverityLevel;
    public message: string;
    public date: Date;

    constructor(message: string, level: LogSeverityLevel){
        this.message = message;
        this.level = level;
        this.date = new Date();
    }
}