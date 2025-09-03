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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
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

  // ✅ Form submission
  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Here you can directly save or send to backend/localStorage
      console.log("✅ Registration data:", formData);

      // Show success snackbar
      this.snackBar.open('Registration successful 🎉', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      // Example: save to localStorage (later phase)
      // localStorage.setItem('blogapp/users', JSON.stringify(formData));

    } else {
      this.registerForm.markAllAsTouched();

      // Show error snackbar
      this.snackBar.open('Please fix the errors in the form ❌', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
