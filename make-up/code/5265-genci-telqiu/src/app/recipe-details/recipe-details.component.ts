import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: any; 

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') || 0);
    if (id) {
      this.apiService.getRecipeById(id).subscribe((data: any) => {
        this.recipe = data; 
      });
    }
  }

  formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    }
    return `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
  }
}
