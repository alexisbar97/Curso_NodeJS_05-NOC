import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
    // attachment?: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor() {}

    async sendEmail(options: SendMailOptions): Promise<boolean>{
        const { to, subject, htmlBody } = options;

        try{
            const sentInformation = await this.transporter.sendMail({
                to: to,                 // Equivalente a to: to
                subject: subject,       // Equivalente a subject: subject
                html: htmlBody
            });

            console.log(sentInformation);

            return true;
        } catch (error) {
            return false;
        }
    }
}