import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ReactiveFormsModule, 
  FormGroup, 
  FormControl, 
  Validators, 
  AbstractControl, 
  ValidationErrors 
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  // Define the form
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: Register.passwordMatchValidator }); 

  // Cross-field validator: compares password & confirmPassword
  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;

    return password === confirm ? null : { passwordMismatch: true };
  }

  // Form submission
  onSubmit() {
  if (this.registerForm.valid) {
    const formData = this.registerForm.value;

    const confirmMsg = `
      Please confirm your details:
      -----------------------------
      Full Name: ${formData.fullName}
      Email: ${formData.email}
      Password: ${formData.password}
      Confirm Password: ${formData.confirmPassword}
    `;

    const confirmed = confirm(confirmMsg);

    if (confirmed) {
      console.log("✅ User confirmed:", formData);
      // later: save to localStorage or AuthService
    } else {
      console.log("❌ User cancelled");
    }

  } else {
    console.log("Form invalid!");
    this.registerForm.markAllAsTouched();
  }
}

}
