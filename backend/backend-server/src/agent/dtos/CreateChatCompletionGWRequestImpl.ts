import { CreateChatCompletionGWRequest } from '@ai-job-search/agent-api';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatCompletionGWRequestImpl
  implements CreateChatCompletionGWRequest
{
  @IsString()
  @IsNotEmpty()
  public userInput: string;
}