// components/navigation-bar.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  template: `
    <nav>
      <ul>
        <li><a routerLink="/bands">Bands</a></li>
        <li><a routerLink="/countries">Countries</a></li>
        <li><a routerLink="/statistics">Statistics</a></li>
        <li><a routerLink="/about">About</a></li>
      </ul>
    </nav>
    <footer>
      <p>Copyright © {{ currentYear }}</p>
      <p>Student ID: {{ studentId }}</p>
      <p>Student Name: {{ studentName }}</p>
      <a routerLink="/about">Learn More</a>
    </footer>
  `,
})
export class NavigationBarComponent {
  currentYear = new Date().getFullYear();
  studentId = '123456789';
  studentName = 'John Doe';
}

