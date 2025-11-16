export class AuthAPI {
  public static readonly URL = '/api/auth';

  public static readonly url = {
    signIn: () => '/api/auth',
    signOut: () => '/api/auth',
    authMe: () => '/api/auth/me',
  }
}