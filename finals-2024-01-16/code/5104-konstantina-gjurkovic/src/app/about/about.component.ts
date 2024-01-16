import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  student: Student | undefined;
  currentYear: number;

  constructor(private studentService: StudentService) { 
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.studentService.getStudent().subscribe(student => {
      this.student = student;
    });
  }
}