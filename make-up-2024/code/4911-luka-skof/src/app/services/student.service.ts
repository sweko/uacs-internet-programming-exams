import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentSubject = new BehaviorSubject<Student>({id: 4911, name: 'Luka Skof'});

  constructor() { }

  getStudent() {
    return this.studentSubject.asObservable();
  }
}
