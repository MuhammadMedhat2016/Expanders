export interface NotifierService {
  send(recipient: string, content: string): Promise<void>;
}

export class Notifier {
  constructor(public service: NotifierService) {}

  send(recipient: string, content: string) {
    this.service.send(recipient, content);
  }
}
