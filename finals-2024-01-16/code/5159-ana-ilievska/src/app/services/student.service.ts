import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentSubject = new BehaviorSubject<Student>({id: 5159, name: 'Ana Ilievska', "https://github.com/ilievskaAna/uacs-internet-programming-exams"});

  constructor() { }

  getStudent() {
    return this.studentSubject.asObservable();
  }
}
