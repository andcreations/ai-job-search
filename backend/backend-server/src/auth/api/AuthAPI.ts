export class AuthAPI {
  public static readonly URL = '/api/auth';

  public static readonly url = {
    signIn: () => `${AuthAPI.URL}`,
    signOut: () => `${AuthAPI.URL}`,
    authMe: () => `${AuthAPI.URL}/me`,
  }
}