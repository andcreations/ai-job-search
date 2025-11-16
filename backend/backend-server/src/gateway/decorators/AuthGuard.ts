import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_COOKIE_NAME } from '@ai-job-search/auth-api';
import { requireStrEnv } from '@ai-job-search/common';
import { JwtPayload, JWT_SECRET_ENV_NAME } from '@ai-job-search/gateway';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string;

  public constructor(private reflector: Reflector) {
    this.jwtSecret = requireStrEnv(JWT_SECRET_ENV_NAME);
  }

  private authorize(context: ExecutionContext, accessToken?: string): void {
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    // verify
    let rawPayload: jwt.JwtPayload | string;
    try {
      rawPayload = jwt.verify(accessToken, this.jwtSecret);
    } catch (error) {
      throw new UnauthorizedException();
    }
    if (typeof rawPayload === 'string') {
      throw new UnauthorizedException();
    }

    // payload
    const payload = rawPayload as JwtPayload;

    // store in request
    const request = context.switchToHttp().getRequest();
    request.user = payload.user;    
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    this.authorize(context, (request.cookies ?? {})[ACCESS_TOKEN_COOKIE_NAME]);
    return true;
  }
}