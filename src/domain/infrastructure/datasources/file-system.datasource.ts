import fs from 'fs';
import { LogDataSource } from "../../datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";

export class FileSystemDataSource implements LogDataSource {
    private readonly logPath = 'logs/';
    private readonly lowLogsPath = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        };

        [
            this.lowLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if(fs.existsSync(path)) {
                return;
            }

            fs.writeFileSync(path, '');
        })
    }

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
    
}