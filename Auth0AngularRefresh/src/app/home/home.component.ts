import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticatedResult } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  userData$: Observable<any>;
  dataFromAzureProtectedApi$: Observable<any>;
  isAuthenticated = false;
  constructor(
    private authservice: AuthService,
    private httpClient: HttpClient
  ) {
    this.userData$ =  of(null);
    this.dataFromAzureProtectedApi$ = of(null);
  }

  ngOnInit() {
    this.userData$ = this.authservice.userData;

    this.authservice.signedIn.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;

      console.warn('authenticated: ', isAuthenticated);
    });
  }

  callApi() {
    this.dataFromAzureProtectedApi$ = this.httpClient
      .get('https://localhost:44390/api/UserOne')
      .pipe(catchError((error) => of(error)));
  }
  login() {
    this.authservice.signIn();
  }

  refreshSession() {
    this.authservice.forceRefreshSession()
      .subscribe((result) => console.log(result));
  }

  logout() {
    this.authservice.signOut();
  }

  logoffAndRevokeTokens() {
    this.authservice.logoffAndRevokeTokens().subscribe((result) => console.log(result));
  }

  revokeRefreshToken() {
    this.authservice.revokeRefreshToken().subscribe((result) => console.log(result));
  }
}
