import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student/student.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})

export class AboutComponent implements OnInit {
  student: Student | null = null;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudent().subscribe(student => {
      this.student = student;
    });
  }
}