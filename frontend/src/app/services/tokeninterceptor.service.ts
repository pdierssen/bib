import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService {

  constructor(
    private router: Router,
    private injector: Injector
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authEndpoints = environment.authendpoints;
    const isAuthEndpoint = authEndpoints.some(endpoint => request.url.includes(endpoint));

    if (isAuthEndpoint) {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == HttpStatusCode.Unauthorized) {
            console.error('401 Unauthorized error for URL:', request.url, 'Error details', error);
          }
          return throwError(() => error);
        })
      );
    }

    let token = null;

    try {
      if (typeof localStorage !== 'undefined') {
        const storedToken = localStorage.getItem(environment.tokenKey);
        if (storedToken) {
          token = JSON.parse(storedToken);
        } else {

        }
      }

    } catch (error) {
      console.error('Error parsing stored auth tokens:', error)
    }

    if (token && token.access) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token.access}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
