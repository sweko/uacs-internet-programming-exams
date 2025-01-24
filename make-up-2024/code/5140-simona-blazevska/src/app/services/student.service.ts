import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentSubject = new BehaviorSubject<Student>({
    id: 5140,
    name: 'Simona Blazhevska',
    year: 'Third year of studies',
  });

  constructor() {}

  getStudent() {
    return this.studentSubject.asObservable();
  }
}
