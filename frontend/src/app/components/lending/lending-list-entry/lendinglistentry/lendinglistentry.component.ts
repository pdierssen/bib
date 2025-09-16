import {Component, Input} from '@angular/core';
import {ILendingEntry} from '../../../../interfaces/lending.interface';
import {NgForOf} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-lendinglistentry',
  standalone: true,
  imports: [
    NgForOf,
    MatExpansionModule,
  ],
  templateUrl: './lendinglistentry.component.html',
  styleUrl: './lendinglistentry.component.scss'
})
export class LendinglistentryComponent {
  @Input() entry!: ILendingEntry
}
