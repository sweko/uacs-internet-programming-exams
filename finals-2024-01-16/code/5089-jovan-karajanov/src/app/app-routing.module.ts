import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandComponent } from './band-create/band/band.component';
import { StatisticsComponent } from './statistics/statistics/statistics.component';
import { AboutComponent } from './about/about/about.component';
import { PlaceListComponent } from './place-list/place-list/place-list.component';
import { BandEditComponent } from './band-edit/band-edit/band-edit.component';


const routes: Routes = [
  { path: 'band-list', component: BandListComponent },
  { path: '', redirectTo: '/band-list', pathMatch: 'full' },
  { path: "band-create", component:BandComponent},
  { path: "statistics", component:StatisticsComponent},
  { path:"about",component:AboutComponent},
  { path:"place-list", component:PlaceListComponent},
  { path:"band-list/:id/edit", component:BandEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
