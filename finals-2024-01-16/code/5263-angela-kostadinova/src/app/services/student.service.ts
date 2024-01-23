import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  getStudent(): import("rxjs").Observable<Student> {
    throw new Error('Method not implemented.');
  }
  
  private studentSubject = new BehaviorSubject<Student>({ id: 5263, name: 'Angela Kostadinova' });

  constructor() { }

}

