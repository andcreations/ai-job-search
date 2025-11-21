export class ThreadsAPI {
  public static readonly URL = '/api/threads';

  public static readonly url = {
    createThread: () => `${ThreadsAPI.URL}`,
  }
}