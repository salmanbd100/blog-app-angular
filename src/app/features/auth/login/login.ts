import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);   // ✅ Router injected

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';

      const users: User[] = JSON.parse(localStorage.getItem('blogapp/users') || '[]');

      const found = users.find(
        (u: User) => u.email === email && u.password === password
      );

      if (found) {
        localStorage.setItem('blogapp/auth', JSON.stringify(found));

        this.snackBar.open('Login successful 🎉', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        // ✅ Redirect after login
        this.router.navigate(['/blogs']);
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