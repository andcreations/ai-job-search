import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { v4 } from 'uuid';
import { Context } from '@ai-job-search/core';

export const InjectContext = createParamDecorator(
  (_data: any, context: ExecutionContext): Context => {
    const request = context.switchToHttp().getRequest();
    return {
      correlationId: request?.correlationId ?? `unknown/${v4()}`,
    }
  }
);