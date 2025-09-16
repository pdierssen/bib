import { HttpInterceptorFn, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor triggered:', req.url);

  const authEndpoints = environment.authendpoints || [];
  const isAuthEndpoint = authEndpoints.some(endpoint => req.url.includes(endpoint));

  let clonedReq = req;

  if (!isAuthEndpoint) {
    try {
      const storedToken = localStorage.getItem(environment.tokenKey);
      if (storedToken) {
        const token = storedToken;
        if (token) {
          clonedReq = req.clone({
            setHeaders: {
              Authorization: `Token ${token}`
            }
          });
        }
      }
    } catch (error) {
      console.error('Error parsing stored auth tokens:', error);
    }
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        console.error('401 Unauthorized for URL:', req.url, error);
        // optionally: redirect to login
      }
      return throwError(() => error);
    })
  );
};
