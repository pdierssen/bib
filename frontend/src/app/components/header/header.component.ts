import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CommonModule, NgIf} from '@angular/common';
import {Router} from "@angular/router";
import {SharedFunctionsService} from '../../services/shared-functions.service';



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
  constructor(
      private authService: AuthService,
      private router: Router,
      private shared: SharedFunctionsService
  ) {
  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  get username(): string | null {
    return this.authService.getUsername();
  }

  register() {
    // example: redirect to login page
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.shared.usesnackbar("Logged out.");
  }

  home() {
    this.router.navigate(['/login']);
  }
}
