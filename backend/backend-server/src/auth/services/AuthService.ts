import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Logger } from '@ai-job-search/log';
import { Context } from '@ai-job-search/core';
import { requireStrEnv } from '@ai-job-search/common';
import { JwtPayload, JWT_SECRET_ENV_NAME } from '@ai-job-search/gateway';

import { ACCESS_TOKEN_COOKIE_MAX_AGE } from '../consts';
import { LoginGWRequestImpl } from '../dtos';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  public constructor(private readonly logger: Logger) {
    this.jwtSecret = requireStrEnv(JWT_SECRET_ENV_NAME);
  }

  public async signIn(
    request: LoginGWRequestImpl,
    context: Context,
  ): Promise<{
    accessToken: string;
  }> {
    this.logger.info('Sign-in request received', {
      ...context,
      username: request.username,
    });

    // payload
    const issuedAt = this.toSeconds(Date.now());
    const payload: JwtPayload = {
      user: {
        // yes, the identifier is the same as the username
        id: request.username,
      },
      iat: issuedAt,
      exp: issuedAt + this.toSeconds(ACCESS_TOKEN_COOKIE_MAX_AGE),
    };

    // sign
    const token = jwt.sign(payload, this.jwtSecret);
    return {
      accessToken: token,
    };
  }

  private toSeconds(milliseconds: number): number {
    return Math.round(milliseconds / 1000);
  }
}