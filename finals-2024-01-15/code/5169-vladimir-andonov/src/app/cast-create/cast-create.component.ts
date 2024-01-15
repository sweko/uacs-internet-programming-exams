import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-cast-create',
  templateUrl: './cast-create.component.html',
  styleUrls: ['./cast-create.component.css']
})
export class CastCreateComponent implements OnInit {
  

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    
  }

  
}
