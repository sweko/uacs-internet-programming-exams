import { Component } from '@angular/core';

@Component({
  selector: 'app-band-about',
  templateUrl: './band-about.component.html',
  styleUrls: ['./band-about.component.css']
})
export class BandAboutComponent {
  studentName: string = 'Mert Miftar'; 
  studentId: string = '5238'; 
  currentYear: number = new Date().getFullYear();
  githubLink: string = 'https://github.com/mertm27/uacs-internet-programming-exams/tree/main/finals-2024-01-16/code/5238-mert-miftar'; 
}
