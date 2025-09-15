import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {environment} from '../../environment/environment';
import {Router} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = environment.apiEndpoint;

  private token = 'token';
  private username = 'name'
  private readonly isBrowser: boolean;

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.token);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.username);
  }

  login(nfc_id: string) {
    // todo hardcoded login endpoint outside env file
    return this.http.post<any>(`${this.endpoint}login/`, {nfc_id})
      .pipe(
        tap(response => {
            localStorage.setItem(this.token, response.token);
            localStorage.setItem(this.username, response.username || '');
          }
        )
      )
  }

  logout() {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.username);
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
      // initialise with local storage
    }
}

