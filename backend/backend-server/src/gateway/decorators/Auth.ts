import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from './AuthGuard';

export const Auth = (): MethodDecorator => {
  return applyDecorators(
    UseGuards(AuthGuard),
  )
}