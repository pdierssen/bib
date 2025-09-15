import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'book-dialog',
  templateUrl: 'book-dialog.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgOptimizedImage,
    MatButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookdialogComponent {}
