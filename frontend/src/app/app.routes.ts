import { Routes } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';

export const routes: Routes = [
  {path: 'dashboard', component: HeaderComponent},
  //{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  //{path: '**', redirectTo: '/dashboard'}
];
