import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../../core/services/blog';
import { Blog } from '../../../models/blog';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.scss']
})
export class BlogList implements OnInit {
  private blogService = inject(BlogService);
  blogs: Blog[] = [];

  ngOnInit() {
    this.blogs = this.blogService.getAllBlogs();
  }
}