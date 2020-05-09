import { Injectable } from '@angular/core';
import { ResultViewModel } from 'projects/hive/src/lib/types';

export interface ICredentials {
  // Customize received credentials here
  username: string;
  email: string;
  id: string;
  token: string;
}

export class CredentialsResult extends ResultViewModel {
  data: ICredentials;
}

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _credentials: ICredentials | null = null;

  constructor() {
    this._credentials = {
      email: 'admin@admin.com',
      username: 'admin@admin.com',
      id: '4b0d990a-cc0e-47f5-e1a6-08d7e7a18319',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0YjBkOTkwYS1jYzBlLTQ3ZjUtZTFhNi0wOGQ3ZTdhMTgzMTkiLCJ1bmlxdWVfbmFtZSI6ImFkbWluQGFkbWluLmNvbSIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwid2luYWNjb3VudG5hbWUiOiJtZWhtZXQua2FucGluYXIiLCJyb2xlIjpbInRlc3QvY2xhaW1zIiwiU3lzdGVtLkFkbWluIiwiU3lzdGVtLkRldmVsb3BlciJdLCJuYmYiOjE1ODc2NTg1MjgsImV4cCI6MTU4NzY2NTcyOCwiaWF0IjoxNTg3NjU4NTI4LCJpc3MiOiJMb29taXNEZXZlbG9wbWVudCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0In0.NcuAPOHiaj47GBI8vynvvzHIKjZ723EPe0gGouSeooU',
    };
    return;
    const savedCredentials =
      sessionStorage.getItem(credentialsKey) ||
      localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get credentials(): ICredentials | null {
    return this._credentials;
  }

  setCredentials(credentials?: ICredentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  roleClaimMatch(requiredRoles: string[]): boolean {
    const isMatch = false;
    const currenttoken = this.credentials.token;
    if (!currenttoken) {
      return false;
    }
    const userRoles = JSON.parse(atob(currenttoken.split('.')[1])).role;
    return (
      userRoles.filter((n) => {
        return requiredRoles.indexOf(n) !== -1;
      }).length > 0
    );
  }
}
