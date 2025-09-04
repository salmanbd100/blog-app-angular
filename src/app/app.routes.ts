import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'register', redirectTo: 'auth/register', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-module').then(m => m.AuthModule),
  },

  {
    path: 'blogs',
    loadChildren: () =>
      import('./features/blogs/blogs-routing-module').then(m => m.BlogsRoutingModule),
  },

  { path: '', redirectTo: 'blogs', pathMatch: 'full' },   // 👈 set blogs as default
  { path: '**', redirectTo: 'blogs' },
];