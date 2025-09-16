import {Component, computed, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {IBookBorrowReturn, ILendingEntry} from '../../interfaces/lending.interface';
import {LendingService} from '../../services/lending.service';
import {MatListModule} from '@angular/material/list';
import {MatLineModule} from '@angular/material/core';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {BookdialogComponent} from './bookdialog.component';
import {NgFor} from '@angular/common';
import {LendinglistentryComponent} from './lending-list-entry/lendinglistentry/lendinglistentry.component';
import {MatAccordion} from '@angular/material/expansion';



@Component({
  selector: 'app-lending',
  standalone: true,
  imports: [
    HeaderComponent,
    MatListModule,
    MatLineModule,
    MatButton,
    NgFor,
    LendinglistentryComponent,
    MatAccordion
  ],
  templateUrl: './lending.component.html',
  styleUrl: './lending.component.scss'
})
export class LendingComponent implements OnInit{
  _lendingentries: WritableSignal<ILendingEntry[]> = signal<ILendingEntry[]>([]);
  lendingentries = computed(() => this._lendingentries());
  readonly dialog = inject(MatDialog);
  readonly borrowBook_nfc_id = signal('');
  readonly returnBook_nfc_id = signal('');

  ngOnInit() {
    this.fetchBorrowedBooks();
  }

  fetchBorrowedBooks() {
    this.lendingService.getBorrowedBooks().subscribe(
      data => {
        this._lendingentries.set(data);
      }
    );
  }

  constructor(
    private lendingService: LendingService
  ) {
  }

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
                }
                console.error('Failed', err);
                alert(message);
  }

  openBorrowDialog() {
    const dialogRef = this.dialog.open(
      BookdialogComponent
    );

    dialogRef.keydownEvents().subscribe(
      event => {
        if (event.key ==='Enter') {
          const book_nfc_id = this.borrowBook_nfc_id();
          if (book_nfc_id) {
            const book: IBookBorrowReturn = {
              "book": book_nfc_id
            }
            this.lendingService.borrowBook(book).subscribe({
              next:  () => {
                console.log("Book borrowed");
                this.fetchBorrowedBooks();
              }, error: err => {
                this.reportError(err);
              }
            });
          }
          this.borrowBook_nfc_id.set('');
        } else if (event.key == 'Shift'){
          // do nothing
        }
        else {
          this.borrowBook_nfc_id.set(this.borrowBook_nfc_id() + event.key);
        }
      }
    );
  }

  openReturnDialog() {
    const dialogRef = this.dialog.open(
      BookdialogComponent
    );

    dialogRef.keydownEvents().subscribe(
      event => {
        if (event.key ==='Enter') {
          const book_nfc_id = this.returnBook_nfc_id();
          if (book_nfc_id) {
            const book: IBookBorrowReturn = {
              "book": book_nfc_id
            }
            this.lendingService.returnBook(book).subscribe({
              next: () => {
                console.log("Book returned.");
                this.fetchBorrowedBooks();
              }, error: err => {
                this.reportError(err);
              }
            });
          }
          this.returnBook_nfc_id.set('');
        } else if (event.key == 'Shift') {
          // do nothing
        }
        else {
          this.returnBook_nfc_id.set(this.returnBook_nfc_id() + event.key);
        }
      }
    );
  }


}
