import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  get signedIn() {
    return this.oidcSecurityService.isAuthenticated$;
  }

  get token() {
    return this.oidcSecurityService.getToken();
  }

  get userData() {
    return this.oidcSecurityService.userData$;
  }

  checkAuth() {
    return this.oidcSecurityService.checkAuth();
  }

  signIn() {
    return of(this.oidcSecurityService.authorize());
  }

  signOut() {
    this.oidcSecurityService.logoff();
  }

  logoffAndRevokeTokens() {
    return this.oidcSecurityService.logoffAndRevokeTokens();
  }

  forceRefreshSession() {
    return this.oidcSecurityService.forceRefreshSession();
  }

  revokeRefreshToken() {
    return this.oidcSecurityService.revokeRefreshToken();
  }
}
