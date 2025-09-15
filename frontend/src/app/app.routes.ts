import { Routes } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {path: 'dashboard', component: HeaderComponent},
  {path: 'login', component: LoginComponent}
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'}
];
