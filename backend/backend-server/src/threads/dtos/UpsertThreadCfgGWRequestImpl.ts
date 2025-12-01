import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { UpsertThreadCfgGWRequest } from '@ai-job-search/threads-api';

export class UpsertThreadCfgGWRequestImpl implements UpsertThreadCfgGWRequest {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsObject()
  public cfg: any;
}