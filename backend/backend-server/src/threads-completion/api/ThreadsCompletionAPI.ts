export class ThreadsCompletionAPI {
  public static readonly URL = '/api/threads/completion';

  public static readonly url = {
    createThreadCompletion: () => `${ThreadsCompletionAPI.URL}`,
  }
}