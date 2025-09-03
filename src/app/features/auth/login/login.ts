import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../../models/user.model'; // adjust path if needed
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule,RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private snackBar = inject(MatSnackBar);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Step 1: Get all registered users
      const users: User[] = JSON.parse(localStorage.getItem('blogapp/users') || '[]');

      // Step 2: Find matching user
      const found = users.find(
        (u: User) => u.email === email && u.password === password
      );

      if (found) {
        // Step 3: Save logged-in user to "auth"
        localStorage.setItem('blogapp/auth', JSON.stringify(found));

        this.snackBar.open('Login successful 🎉', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        // Step 4: Navigate to blogs (later we'll add Router)
        // this.router.navigate(['/blogs']);
      } else {
        this.snackBar.open('Invalid credentials ❌', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    } else {
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Please enter email and password ❌', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
