import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {
  actor: any;

  constructor(private route: ActivatedRoute, private movieService:MoviesService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.movieService.getActorById(id).subscribe(actor => {
      this.actor = actor;
    });
  }
}