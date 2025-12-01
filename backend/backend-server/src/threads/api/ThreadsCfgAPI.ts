export class ThreadsCfgAPI {
  public static readonly URL = '/api/threads/cfg';

  public static readonly url = {
    upsertThreadCfg: () => `${ThreadsCfgAPI.URL}`,
  }
}