import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware<Request, Response> {
  use(_req: Request, _res: Response, next: () => void) {
    console.log('Request...');
    next();
  }
}

export default LoggerMiddleware;
