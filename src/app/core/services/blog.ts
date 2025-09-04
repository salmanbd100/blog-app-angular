import { Injectable } from '@angular/core';
import { Blog } from '../../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private storageKey = 'blogapp/blogs';

  constructor() {
    this.seedBlogs();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private seedBlogs() {
    if (!this.isBrowser()) return;

    const existing = localStorage.getItem(this.storageKey);
    if (!existing) {
      const demoBlogs: Blog[] = [
        {
          id: 1,
          title: 'Getting Started with Angular',
          excerpt: 'Learn the basics of Angular and why it’s so popular.',
          content: 'Angular is a TypeScript-based framework developed by Google... (full content here).',
          author: 'Admin',
          publishDate: new Date(),
          date: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Understanding TypeScript',
          excerpt: 'Why Angular uses TypeScript and the benefits it brings.',
          content: 'TypeScript adds strong typing, interfaces, and generics to JavaScript... (full content here).',
          author: 'Ray',
          publishDate: new Date(),
          date: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Angular Components Explained',
          excerpt: 'A deep dive into Angular’s component architecture.',
          content: 'Components are the building blocks of Angular applications... (full content here).',
          author: 'Admin',
          publishDate: new Date(),
          date: new Date().toISOString()
        },
        {
          id: 4,
          title: 'Angular Routing Basics',
          excerpt: 'Learn how Angular Router works to navigate between pages.',
          content: 'Routing in Angular allows you to map URLs to components... (full content here).',
          author: 'Sof',
          publishDate: new Date(),
          date: new Date().toISOString()
        },
        {
          id: 5,
          title: 'Reactive Forms in Angular',
          excerpt: 'Why Reactive Forms are powerful and how to use them.',
          content: 'Reactive Forms give you full control of form validation and state... (full content here).',
          author: 'Ray',
          publishDate: new Date(),
          date: new Date().toISOString()
        },
        {
          id: 6,
          title: 'Angular Services & Dependency Injection',
          excerpt: 'How Angular services share data and logic across components.',
          content: 'Services in Angular are singletons injected into components... (full content here).',
          author: 'Admin',
          publishDate: new Date(),
          date: new Date().toISOString()
        },
        {
          id: 7,
          title: 'Using Angular Material',
          excerpt: 'Make your Angular app look great with Material Design components.',
          content: 'Angular Material provides a set of reusable UI components... (full content here).',
          author: 'Ray',
          publishDate: new Date(),
          date: new Date().toISOString()
        },
        {
          id: 8,
          title: 'State Management in Angular',
          excerpt: 'Different approaches for managing state in Angular apps.',
          content: 'State can be managed using services, RxJS, or libraries like NgRx... (full content here).',
          author: 'Sof',
          publishDate: new Date(),
          date: new Date().toISOString()
        },
        {
          id: 9,
          title: 'Angular Pipes Deep Dive',
          excerpt: 'Learn how to transform data in templates with pipes.',
          content: 'Pipes in Angular are simple functions to transform output in templates... (full content here).',
          author: 'Admin',
          publishDate: new Date(),
          date: new Date().toISOString()
        },
        {
          id: 10,
          title: 'Optimizing Angular Performance',
          excerpt: 'Tips and tricks to make your Angular app faster.',
          content: 'Use OnPush change detection, lazy loading, and trackBy in ngFor... (full content here).',
          author: 'Ray',
          publishDate: new Date(),
          date: new Date().toISOString()
        },
        {
          id: 11,
          title: 'Angular Testing with Jasmine & Karma',
          excerpt: 'Write unit tests for your Angular components and services.',
          content: 'Testing ensures that your Angular app is reliable and maintainable... (full content here).',
          author: 'Admin',
          publishDate: new Date(),
          date: new Date().toISOString()
        },
        {
          id: 12,
          title: 'Deploying Angular Apps',
          excerpt: 'How to deploy your Angular app to production.',
          content: 'You can deploy Angular apps using Vercel, Netlify, Firebase, or traditional servers... (full content here).',
          author: 'Sof',
          publishDate: new Date(),
          date: new Date().toISOString()
        }
      ];

      localStorage.setItem(this.storageKey, JSON.stringify(demoBlogs));
    }
  }

  getAllBlogs(): Blog[] {
    if (!this.isBrowser()) return [];
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getBlogById(id: number): Blog | undefined {
    if (!this.isBrowser()) return undefined;
    return this.getAllBlogs().find(b => b.id === id);
  }
}