import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {environment} from '../../environment/environment';
import {Router} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {IRegistration} from "../interfaces/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = environment.apiEndpoint;
  private readonly isBrowser: boolean;

  isAuthenticated(): boolean {
    return !!localStorage.getItem(environment.tokenKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(environment.usernameKey);
  }

  login(nfc_id: string) {
    // todo hardcoded login endpoint outside env file
    return this.http.post<any>(`${this.endpoint}login/`, {nfc_id})
      .pipe(
        tap(response => {
            localStorage.setItem(environment.tokenKey, response.token);
            localStorage.setItem(environment.usernameKey, response.name || '');
          }
        )
      )
  }

  register(data: IRegistration) {
    return this.http.post<any>(`${this.endpoint}register/`, data);
  }

  logout() {
    localStorage.removeItem(environment.tokenKey);
    localStorage.removeItem(environment.usernameKey);
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

