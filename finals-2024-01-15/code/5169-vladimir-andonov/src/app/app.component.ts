import { Component } from '@angular/core';
import { StudentService } from './services/student.service';
import { Observable } from 'rxjs';
import { Student } from './models/student';
import { ActorService } from './services/actor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  student$: Observable<Student> = this.actorService.getActor();
  
  constructor(private actorService: ActorService) { 
    
  }
}
