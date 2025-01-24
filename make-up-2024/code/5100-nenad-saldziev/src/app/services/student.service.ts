import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentSubject = new BehaviorSubject<Student>({id: 1, name: 'John Doe'});

  constructor( ) { }

  // url : string = "http://localhost:3000/recipes"

  getStudent() {
    return this.studentSubject.asObservable();
  }
}
