import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'register', redirectTo: 'auth/register', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-module').then(m => m.AuthModule),
  },

  { path: '', redirectTo: 'auth/register', pathMatch: 'full' }, // temp default
  { path: '**', redirectTo: 'auth/register' },
];
