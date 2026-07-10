import { AbpAuthResponse, ConfigStateService, IAuthService, LoginParams } from '@abp/ng.core';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Observable, delay, tap } from 'rxjs';
import { AccountService, LoginOutput } from 'src/app/proxy/unaj/payment/public/controllers';

@Injectable({
  providedIn: 'root',
})
export class CustomAuthService implements IAuthService {
  constructor(public confState: ConfigStateService, public router: Router, public accountService: AccountService) { }
  oidc: boolean;
  get isInternalAuth(): boolean {
    throw new Error('Method not implemented.');
  }
  get isAuthenticated(): boolean {
    return this.confState.getAll().currentUser.isAuthenticated;
  }
  init(): Promise<any> {
    return Promise.resolve();
  }
  logout(queryParams?: Params): Observable<any> {
    localStorage.removeItem('456');
    this.navigateToLogin();
    return this.confState.refreshAppState();
  }
  navigateToLogin(queryParams?: Params): void {
    this.router.navigate(['/auth']);
  }
  login(params: LoginParams): Observable<any> {
    let res = this.accountService
      .postByModel({
        user: params.username,
        password: params.password,
      })
      .pipe(
        tap((res: LoginOutput) => {
          localStorage.setItem('456', res.accessToken);
        }),
        tap((res: LoginOutput) => {
          this.confState.refreshAppState();
        }),
        delay(200)
      );
    return res;
  }
  loginUsingGrant(grantType: string, parameters: object, headers?: HttpHeaders): Promise<AbpAuthResponse> {
    throw new Error('Method not implemented.');
  }
  getAccessTokenExpiration(): number {
    throw new Error('Method not implemented.');
  }
  getRefreshToken(): string {
    throw new Error('Method not implemented.');
  }
  getAccessToken(): string {
    throw new Error('Method not implemented.');
  }
  refreshToken(): Promise<AbpAuthResponse> {
    throw new Error('Method not implemented.');
  }
}
