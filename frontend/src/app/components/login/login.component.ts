import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {HeaderComponent} from "../header/header.component";
import {NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {SharedFunctionsService} from '../../services/shared-functions.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private inputBuffer: string = '';

  constructor(
    private authService: AuthService,
    private elRef: ElementRef,
    private router: Router,
    private shared: SharedFunctionsService
  ) {
  }

  ngOnInit() {
    // focus the div so it can capture keyboard events
    this.elRef.nativeElement.querySelector('.login-container').focus();
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const nfcId = this.inputBuffer.trim();
      if (nfcId) {
        this.login(nfcId);
      }
      this.inputBuffer = '';
    } else if (event.key == 'Shift') {
      // do nothing
    }
    else {
      // accumulate characters from keyboard/NFC
      this.inputBuffer += event.key;
    }
    event.preventDefault();
  }

  login(nfcId: string) {
    this.authService.login(nfcId).subscribe({
      next: () => {
        console.log('Login successful!');
        this.shared.usesnackbar("Logged in.");
        this.router.navigate(['/lending']);
      },
      error: err => {
        this.shared.visualizeError(err);
      }
    });
  }

}
