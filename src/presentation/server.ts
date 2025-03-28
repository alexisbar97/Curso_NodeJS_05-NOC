import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class Server {
    public static start() {
        console.log('Server started...');
        
        // Send Email
        const emailService = new EmailService();
        emailService.sendEmail({
            to: 'example.mail.development@gmail.com',
            subject: 'Logs de Sistema',
            htmlBody: `<h3>Logs de Sistema - NOC</h3>
            <p>Por favor revisar los logs.</p>
            `
        });

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