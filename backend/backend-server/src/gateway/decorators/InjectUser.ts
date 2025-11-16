import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '@ai-job-search/gateway';

export const InjectUser = createParamDecorator(
  (_data: any, context: ExecutionContext): AuthUser => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
);