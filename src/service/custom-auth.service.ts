import { AbpAuthResponse, ConfigStateService, IAuthService, LoginParams } from '@abp/ng.core';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Observable, delay, of, tap } from 'rxjs';
import { AccountService, LoginOutput } from 'src/app/proxy/unaj/payment/public/controllers';
import { JWT_LOCALSTORAGE_KEY } from './constants';

@Injectable({
  providedIn: 'root',
})
export class JwtAuthService implements IAuthService {
  constructor(public confState: ConfigStateService, public router: Router, public accountService: AccountService) { }
  oidc: boolean = false;
  get isInternalAuth(): boolean {
    throw new Error('Method not implemented.');
  }
  get isAuthenticated(): boolean {
    return this.confState.getAll().currentUser.isAuthenticated;
  }
  init(): Promise<any> {
    return Promise.resolve(undefined);
  }
  // shloud suscribe
  logout(queryParams?: Params): Observable<any> {
    localStorage.removeItem(JWT_LOCALSTORAGE_KEY);
    this.navigateToLogin();
    this.confState.refreshAppState().subscribe();
    return of({
      result: true,
    })
  }
  navigateToLogin(queryParams?: Params): void {
    this.router.navigate(['/auth']);
  }
  // shloud suscribe
  login(params: LoginParams): Observable<any> {
    let res = this.accountService
      .postByModel({
        user: params.username,
        password: params.password,
      })
      .pipe(
        tap((res: LoginOutput) => {
          localStorage.setItem(JWT_LOCALSTORAGE_KEY, res.accessToken);
        }),
        tap((res: LoginOutput) => {
          this.confState.refreshAppState();
        }),
        delay(200)
      ).subscribe();
    return of({
      result: true,
    });
  }
  loginUsingGrant(grantType: string, parameters: object, headers?: HttpHeaders): Promise<AbpAuthResponse> {
    throw new Error('Method not implemented.');
  }
  getAccessTokenExpiration(): number {
    return 0;
  }
  getRefreshToken(): string {
    return "";
  }
  getAccessToken(): string {
    return localStorage.getItem(JWT_LOCALSTORAGE_KEY);
  }
  refreshToken(): Promise<AbpAuthResponse> {
    return Promise.resolve(undefined);
  }
}
