import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { getStrEnv } from '@ai-job-search/common'

import {
  SYSTEM_ADMIN_TOKEN_ENV_NAME,
  SYSTEM_ADMIN_TOKEN_HTTP_HEADER,
} from '../consts'

@Injectable()
export class AuthSystemAdminGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const systemAdminToken = request.headers[SYSTEM_ADMIN_TOKEN_HTTP_HEADER]
    if (!AuthSystemAdminGuard.isHttpSystemAdminTokenValid(systemAdminToken)) {
      // not found because we don't want to leak the existence of the endpoint
      throw new NotFoundException()
    }
    return true
  }

  private static isHttpSystemAdminTokenValid(token: string): boolean {
    const systemAdminToken = getStrEnv(SYSTEM_ADMIN_TOKEN_ENV_NAME);
    return systemAdminToken?.length > 0 && token === systemAdminToken;
  }
}
