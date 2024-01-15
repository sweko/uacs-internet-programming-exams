import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
studentName: string = 'Your Name';
studentID: string = 'Your ID';
currentYear: number = new Date().getFullYear();
githubLink: string = "https://github.com/cekovskaa/uacs-internet-programming-exams/tree/main/finals-2024-01-15/docs";

}
