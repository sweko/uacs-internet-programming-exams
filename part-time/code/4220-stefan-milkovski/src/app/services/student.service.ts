import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentSubject = new BehaviorSubject<Student>({id: 4220, name: 'Stefan Milkovski'});

  constructor(private http: HttpClient) {
  }

  private apiUrl = "https://localhost:2999/db/recipe-data.json";

  getStudent() {
    return this.studentSubject.asObservable();
  }

  getApi() {
    return this.http.get<HttpClient>(this.apiUrl);
  }

}
