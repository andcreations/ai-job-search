import { IsString, IsNotEmpty } from 'class-validator';
import { LoginGWRequest } from '@ai-job-search/auth-api';

export class LoginGWRequestImpl implements LoginGWRequest {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}