import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandDetailsComponent } from './band-details/band-details.component';
import { BandEditComponent } from './band-edit/band-edit.component';
import { AboutComponent } from './about/about.component';
import { StatisticsComponent } from './statistics/statistics.component';


const routes: Routes = [
  { path: '', redirectTo: '/band-list', pathMatch: 'full' },
  { path: 'band-list', component: BandListComponent },
  { path: "band/:id", component: BandDetailsComponent },
  { path: "band/:id/edit", component: BandEditComponent },
  { path: "about", component:AboutComponent},
  { path: "statistics", component: StatisticsComponent},
  { path: '**', redirectTo: '/band-list' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
