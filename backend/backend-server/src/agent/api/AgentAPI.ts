export class AgentAPI {
  public static readonly URL = '/api/agent';

  public static readonly url = {
    createChatCompletion: () => `${AgentAPI.URL}`,
  }
}