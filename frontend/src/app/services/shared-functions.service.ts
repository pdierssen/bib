import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  visualizeError(err: any) {
    console.error('Failed', err);
    let messaeg = this.extractErrorMessage(err);
    this.snackbar.open(messaeg, 'close', {duration: 6000});
  }

  visualizeSuccess(message: string){

  }


  extractErrorMessage(err: any): string{
    let message = 'Failed';
    if (err.error) {
      if (err.error.non_field_errors && err.error.non_field_errors.length > 0) {
        message = err.error.non_field_errors[0]; // Take the first error message
      } else if (err.error.detail) {
        message = err.error.detail;
      } else if (err.error.book){
        message = err.error.book[0];
      } else if (typeof err.error === 'string') {
        message = err.error;
      }
    }
    return message;
  }
}
