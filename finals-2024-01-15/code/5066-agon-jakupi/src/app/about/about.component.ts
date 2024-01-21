import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  studentName: string = 'Agon';
  studentID: string = '5066';
  currentYear: number = new Date().getFullYear();
  githubRepository: string = 'https://github.com/GonnyFTW';

}
