// send-mail-app-password.mjs (Node 18+, ESM)
import nodemailer from 'nodemailer';
import { NotifierService } from './Notifier';
export class EmailService implements NotifierService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  async send(recipient: string, content: string): Promise<void> {
    this.transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: recipient,
      subject: 'Expanders360',
      text: content,
    });
  }
}
