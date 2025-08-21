// src/app/features/blogs/blogs-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
  { path: '', component: BlogListComponent },       // /blogs
  { path: ':id', component: BlogDetailsComponent }, // /blogs/:id (or :slug)
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class BlogsRoutingModule {}
