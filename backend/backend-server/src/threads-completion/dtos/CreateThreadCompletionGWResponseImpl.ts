import { 
  GWMessage,
  CreateThreadCompletionGWResponse,
} from '@ai-job-search/threads-completion-api';

export class CreateThreadCompletionGWResponseImpl
  implements CreateThreadCompletionGWResponse
{
  public messages: GWMessage<unknown>[];
}