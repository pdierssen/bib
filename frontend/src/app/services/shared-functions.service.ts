import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {

  constructor() { }

    reportError(err: any) {
    let message = 'Failed';
      if (err.error) {
        if (err.error.non_field_errors && err.error.non_field_errors.length > 0) {
          message = err.error.non_field_errors[0]; // Take the first error message
        } else if (err.error.detail) {
          message = err.error.detail;
        } else if (typeof err.error === 'string') {
          message = err.error;
        }
      } else {

      }
      console.error('Failed', err);
      alert(message);
  }
}
