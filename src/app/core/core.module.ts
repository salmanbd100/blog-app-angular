import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';         // for routerLink in navbar
import { SharedModule } from '../shared/shared.module'; // Material/buttons/icons, etc.

import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ScrollTopComponent } from './layouts/scroll-top/scroll-top.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ScrollTopComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,   // optional but useful if Navbar uses Material
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ScrollTopComponent,
  ],
})
export class CoreModule {}
