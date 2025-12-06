import { IsNotEmpty, IsString } from 'class-validator';
import {
  CreateThreadCompletionGWRequest,
} from '@ai-job-search/threads-completion-api';

export class CreateThreadCompletionGWRequestImpl
  implements CreateThreadCompletionGWRequest
{
  @IsString()
  @IsNotEmpty()
  public threadId: string;

  @IsString()
  @IsNotEmpty()
  public userMessage: string;
}