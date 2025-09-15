import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CommonModule, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private authService: AuthService) {
  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  get username(): string | null {
    return this.authService.getUsername();
  }

  login() {
    // example: redirect to login page
    this.authService.login("id");
  }

  logout() {
    this.authService.logout();
  }

}
