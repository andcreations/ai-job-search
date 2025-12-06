import { IsNotEmpty, IsString } from 'class-validator';
import {
  StreamThreadCompletionGWRequest,
} from '@ai-job-search/threads-completion-api';

export class StreamThreadCompletionGWRequestImpl
  implements StreamThreadCompletionGWRequest
{
  @IsString()
  @IsNotEmpty()
  public threadId: string;

  @IsString()
  @IsNotEmpty()
  public userMessage: string;
}