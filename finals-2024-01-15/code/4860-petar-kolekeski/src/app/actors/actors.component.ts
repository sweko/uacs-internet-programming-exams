import {Component, OnInit} from '@angular/core';
import {ActorService} from "../services/actor.service";
import {Actor} from "../models/actor";

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.css'
})
export class ActorsComponent implements OnInit{

  actors: Actor[] = []

  constructor(private service: ActorService){

  }

  ngOnInit(): void {
    this.service.getActors().subscribe(
      res => this.actors = res
    )
  }

}
