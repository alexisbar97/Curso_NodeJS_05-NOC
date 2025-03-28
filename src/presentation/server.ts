import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

const emailService = new EmailService();

export class Server {
    public static start() {
        console.log('Server started...');
        
        // Send Email
        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute(['example.mail.development@gmail.com'])

        // emailService.sendEmailWithFileSystemLogs([
        //     'example.mail.development@gmail.com',
        // ]);

        // CronService.createJob(
        //     '*/5 * * * * *', 
        //     () => {
        //     const url = 'https://google.com';
        //     // const url = 'http://localhost:3000/';
        //     new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log(`${url} is ok.`),
        //         (error) => console.log(error),
        //     ).execute(url);

        //     // new CheckService().execute('http://localhost:3000/');
        // });
    }
}