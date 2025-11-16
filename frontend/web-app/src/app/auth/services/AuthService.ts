import { Service } from '@andcreations/common';
import { HTTPWebClientService } from '@andcreations/web-common';
import {
  LoginGWRequest,
  AuthMeGWResponse,
  AuthAPI,
} from '@ai-job-search/auth-api';

@Service()
export class AuthService {
  private signedIn: boolean = false;

  public constructor(private readonly http: HTTPWebClientService) {
  }

  public async signIn(username: string, password: string): Promise<void> {
    await this.http.post<LoginGWRequest, void>(
      AuthAPI.url.signIn(),
      { username, password },
    );
    this.signedIn = true;
  }

  public async signOut(): Promise<void> {
    await this.http.delete<void>(AuthAPI.url.signOut());
    this.signedIn = false;
  }

  public async authMe(): Promise<boolean> {
    try {
      const response = await this.http.get<AuthMeGWResponse>(
        AuthAPI.url.authMe(),
      );
      if ([200,304].includes(response.status)) {
        this.signedIn = true;
        return true;
      }
      return false;
    } catch (error) {
    }
  }

  public isSignedIn(): boolean {
    return this.signedIn;
  }
}