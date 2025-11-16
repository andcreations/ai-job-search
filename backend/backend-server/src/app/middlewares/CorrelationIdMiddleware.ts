import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  public use(req: any, _res: any, next: () => void) {
    (req as any).correlationId = v4();
    next();
  }
}