export class ThreadsCompletionAPI {
  public static readonly URL = '/api/threads/completion';

  public static readonly url = {
    createThreadCompletion: () => `${ThreadsCompletionAPI.URL}/create`,
    streamThreadCompletion: () => `${ThreadsCompletionAPI.URL}/stream`,
  }
}