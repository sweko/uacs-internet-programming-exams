import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
})
export class AboutPageComponent {
  student$: Observable<Student> = this.studentService.getStudent();

  constructor(private studentService: StudentService) {}
}
