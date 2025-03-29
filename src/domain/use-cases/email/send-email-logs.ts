import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLoEmailUseCase {
    execute:(to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLoEmailUseCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) {}

    async execute(to: string | string[]) {
        try{
           const sent = this.emailService.sendEmailWithFileSystemLogs(to);
           if(!sent) {
               throw new Error('Email log was not send.');
           }

           const log = new LogEntity({
               message: 'Email log was sent.', 
               level: LogSeverityLevel.low, 
               origin: 'send-email-logs.ts'
           });

           return true;
        } catch (error) {
            const log = new LogEntity({
                message: `${error}`, 
                level: LogSeverityLevel.high, 
                origin: 'send-email-logs.ts'
            });

            this.logRepository.saveLog(log);
            return false;
        }
        
    } 

}