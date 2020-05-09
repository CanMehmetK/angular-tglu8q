import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'projects/environments/environment';
import {
  CredentialsService,
  ICredentials,
  CredentialsResult,
} from 'projects/hive/src/lib/auth/credentials.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface ILoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private credentialsService: CredentialsService
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: ILoginContext): Observable<ICredentials> {
    // Replace by proper authentication call
    // var data: Credentials = {} ;

    return this.http
      .post<CredentialsResult>(
        `${environment.API_URL}${environment.LOGIN_URL}`,
        {
          email: context.username,
          password: context.password,
        }
      )
      .pipe(
        map((tokenresult) => {
          if (!tokenresult || !tokenresult.data || !tokenresult.data.token) {
            return;
          }
          this.credentialsService.setCredentials(
            tokenresult.data,
            context.remember
          );
          return tokenresult.data;
        })
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials(null, false);
    return of(true);
  }

  roleMatch(path: string): boolean {
    const isMatch = false;
    const currenttoken = this.credentialsService.credentials.token;
    if (!currenttoken) {
      return false;
    }
    const userRoles = JSON.parse(atob(currenttoken.split('.')[1])).role;
    return userRoles.indexOf(path) > -1;
  }
}
