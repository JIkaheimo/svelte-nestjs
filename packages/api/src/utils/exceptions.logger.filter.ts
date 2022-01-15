import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('Exception thrown:', exception?.message);
    super.catch(exception, host);
  }
}

export default ExceptionsLoggerFilter;
