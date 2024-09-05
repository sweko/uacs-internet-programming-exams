import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CuisinesService } from '../cuisines.service';

@Component({
  selector: 'app-cuisine-list',
  templateUrl: './cuisine-list.component.html',
  styleUrl: './cuisine-list.component.css'
})
export class CuisineListComponent {
  constructor(private cuisines:CuisinesService, private router: Router){}

  cuisinesData: any=[];

ngOnInit(){
  this.cuisines.getAllCuisines().subscribe((allData)=>
    {
      console.log(allData);
      this.cuisinesData=allData;
    });

}
}
