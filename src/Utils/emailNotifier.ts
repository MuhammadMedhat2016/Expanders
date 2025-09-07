import { EmailService } from './emailService';
import { Notifier } from './Notifier';

export const emailNotifier = new Notifier(new EmailService());
