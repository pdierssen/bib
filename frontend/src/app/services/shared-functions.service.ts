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
    let message = this.extractErrorMessage(err);
    this.snackbar.open(message, 'close', {duration: 6000});
  }

  usesnackbar(message: string){
    this.snackbar.open(message, 'close', {duration: 6000});
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
      } else if (err.error.error) {
        message = err.error.error;
      } else if (err.error.nfc_id) {
        message = err.error.nfc_id;
      } else if (typeof err.error === 'string') {
        message = err.error;
      }
    }
    return message;
  }
}
