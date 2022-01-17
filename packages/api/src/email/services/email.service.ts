import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { EMAIL_PASSWORD, EMAIL_SERVICE, EMAIL_USER } from 'src/config/schemas';

@Injectable()
export class EmailService {
  private transport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.transport = createTransport({
      service: configService.get(EMAIL_SERVICE),
      auth: {
        user: configService.get(EMAIL_USER),
        pass: configService.get(EMAIL_PASSWORD),
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.transport.sendMail(options);
  }
}

export default EmailService;
