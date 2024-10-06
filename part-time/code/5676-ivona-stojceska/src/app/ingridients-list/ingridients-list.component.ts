import { Component } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingridients-list',
  templateUrl: './ingridients-list.component.html',
  styleUrl: './ingridients-list.component.css'
})
export class IngridientsListComponent {
constructor(private ingredients:IngredientsService, private router: Router){}

ingredientsData: any=[];

ngOnInit(){
  this.ingredients.getAllIngredients().subscribe((allData)=>
    {
      console.log(allData);
      this.ingredientsData=allData;
    });

}
}
