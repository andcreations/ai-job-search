import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Context } from '@ai-job-search/core';
import {
  Auth,
  AuthUser,
  InjectContext,
  InjectUser,
} from '@ai-job-search/gateway';
import { ACCESS_TOKEN_COOKIE_NAME, AuthAPI } from '@ai-job-search/auth-api';

import { ACCESS_TOKEN_COOKIE_MAX_AGE } from '../consts';
import { AuthMeGWResponseImpl, LoginGWRequestImpl } from '../dtos';
import { AuthService } from '../services';

@Controller(AuthAPI.URL)
export class AuthController {
  public constructor(private readonly authService: AuthService) {
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Body() request: LoginGWRequestImpl,
    @InjectContext() context: Context,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const { accessToken } = await this.authService.signIn(request, context);
    response.cookie(
      ACCESS_TOKEN_COOKIE_NAME,
      accessToken,
      {
        path: '/api',
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
      },
    );    
  }

  @Auth()
  @Delete()
  @HttpCode(HttpStatus.OK)
  public async signOut(
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    response.setCookie(
      ACCESS_TOKEN_COOKIE_NAME,
      '',
      {
        path: '/api',
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 0,
      },
    );      
  }

  @Auth()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  public async authMe(
    @InjectUser() user: AuthUser,
  ): Promise<AuthMeGWResponseImpl> {
    return { userId: user.id };
  }  
}