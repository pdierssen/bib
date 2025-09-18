import {Component, ElementRef, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {IRegistration} from '../../interfaces/auth.interface';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {NgOptimizedImage} from '@angular/common';
import {SharedFunctionsService} from '../../services/shared-functions.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HeaderComponent,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButton,
    MatInput,
    NgOptimizedImage
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  nameFormGroup: FormGroup = new FormGroup(
      {
        first_name: new FormControl<string>('', Validators.required),
        last_name: new FormControl<string>('', Validators.required)
      }
    );

  private nfcBuffer: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private elRef: ElementRef,
    private shared: SharedFunctionsService
  )
  {

  }

  ngOnInit() {


    // focus on NFC step if needed
    const nfcDiv = this.elRef.nativeElement.querySelector('.nfc-step-container');
    if (nfcDiv) nfcDiv.focus();
  }

  // Capture NFC or keyboard input
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const nfcId = this.nfcBuffer.trim();

      if (nfcId) {
        this.register(nfcId);
      }
      this.nfcBuffer = '';
    } else if (event.key == 'Shift'){
      // do nothing
    }
    else {
      this.nfcBuffer += event.key;
    }
    event.preventDefault();
  }


  register(nfc_id: string) {
    const data: IRegistration = {
      first_name: this.nameFormGroup.controls['first_name'].value,
      last_name: this.nameFormGroup.controls['last_name'].value,
      nfc_id: nfc_id
    };
    console.log(data);
    this.authService.register(data).subscribe({
      next: () => {
        console.log('Registration successful!');
        this.shared.usesnackbar("Registered.");
        this.router.navigate(['/login']); // redirect after success
      },
      error: (err) => {
        this.shared.visualizeError(err);
      }
    });
  }

  onStepChange(event: any) {
    const nextStepIndex = event.selectedIndex; // The index of the newly selected step

    // Use a timeout to ensure the element is rendered in the DOM
    setTimeout(() => {
      const inputElement = document.getElementById(`nfc_input`); // Assuming you want to focus the second input
      if (inputElement) {
        inputElement.focus();
      }
    }, 0); // 0ms delay is often enough, but you can increase it if needed
  }
}
