import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ReactiveFormsModule, 
  FormGroup, 
  FormControl, 
  Validators, 
  AbstractControl, 
  ValidationErrors 
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  private snackBar = inject(MatSnackBar);

  // ✅ Define form
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).+$/) // must contain upper & lower
    ]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: Register.passwordMatchValidator }); 

  // ✅ Cross-field validator
  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

 onSubmit() {
  if (this.registerForm.valid) {
    const formData = this.registerForm.value;

    // Step 1: Get existing users or start with empty []
    const users = JSON.parse(localStorage.getItem('blogapp/users') || '[]');

    // Step 2: Add new user
    users.push(formData);

    // Step 3: Save back to localStorage
    localStorage.setItem('blogapp/users', JSON.stringify(users));

    console.log("✅ User saved to localStorage:", formData);

    this.snackBar.open('Registration successful 🎉', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });

    // (Optional) Reset form after success
    this.registerForm.reset();

  } else {
    this.registerForm.markAllAsTouched();

    this.snackBar.open('Please fix the errors in the form ❌', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}

}
