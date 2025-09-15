import {Component, computed, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ILendingEntry} from '../../interfaces/lending.interface';
import {LendingService} from '../../services/lending.service';
import {MatListModule} from '@angular/material/list';
import {MatLine} from '@angular/material/core';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {BookdialogComponent} from './bookdialog.component';
import {NgFor} from '@angular/common';



@Component({
  selector: 'app-lending',
  standalone: true,
  imports: [
    HeaderComponent,
    MatListModule,
    MatLine,
    MatButton,
    NgFor
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

  openBorrowDialog() {
    const dialogRef = this.dialog.open(
      BookdialogComponent
    );

    dialogRef.keydownEvents().subscribe(
      event => {
        if (event.key ==='Enter') {
          const book_nfc_id = this.borrowBook_nfc_id();
          if (book_nfc_id) {
            this.lendingService.borrowBook(book_nfc_id).subscribe({
              next:  () => {
                console.log("Book borrowed");
              }, error: err => {
                console.error('Borrowing failed', err);
                alert('Borrowing failed');
              }
            });
          }
          this.borrowBook_nfc_id.set('');
        } else {
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
            this.lendingService.returnBook(book_nfc_id).subscribe({
              next: () => {
                console.log("Book returned.");
              }, error: err => {
                console.error('Return failed', err);
                alert('Return failed');
              }
            });
          }
          this.returnBook_nfc_id.set('');
        } else {
          this.returnBook_nfc_id.set(this.returnBook_nfc_id() + event.key);
        }
      }
    );
  }


}
