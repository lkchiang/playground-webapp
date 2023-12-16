import { Injectable } from '@angular/core';
import { Observable, of, Subject, takeUntil, tap } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private $unsubscribe: Subject<void> = new Subject();
  private login$: Observable<string>= of();

  private readonly url: string = 'tokens';

  constructor(private apiService: ApiService) {}

  public login(username: string) : Observable<string> {
    this.clearSession();
    this.login$ = this.apiService.getData(`${this.url}/generate?username=${username}`);
    return this.login$.pipe(
      takeUntil(this.$unsubscribe),
      tap((token: string) => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('role', this.getDecodedRole(token));
      })
    );
  }
  
  public getLoginUser(): string {
    return sessionStorage.getItem('username') ?? '';
  }

  public getToken(): string {
    return sessionStorage.getItem('token') ?? '';
  }

  public getRole(): string {
    return sessionStorage.getItem('role') ?? '';
  }

  private getDecodedRole(token: string): string {
    const decoded = this.getDecodedAccessToken(token);
    return (decoded && decoded.hasOwnProperty('role')) ? decoded['role'] : '';
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode.jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  private clearSession(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
  }
}
