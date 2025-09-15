import { Routes } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [
  {path: 'dashboard', component: HeaderComponent}, // no need
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'},
];
