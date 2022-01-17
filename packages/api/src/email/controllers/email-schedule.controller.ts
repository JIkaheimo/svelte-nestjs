import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/authentication';
import { EmailSchedule } from '../dtos';
import { EmailSchedulingService } from '../services';

@Controller('email-scheduling')
export default class EmailSchedulingController {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingService,
  ) {}

  @Post('schedule')
  @UseGuards(JwtAuthenticationGuard)
  async scheduleEmail(@Body() emailSchedule: EmailSchedule) {
    this.emailSchedulingService.scheduleEmail(emailSchedule);
  }
}
