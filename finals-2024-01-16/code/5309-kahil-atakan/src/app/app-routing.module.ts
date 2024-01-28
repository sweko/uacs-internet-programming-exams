import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandAddComponent } from './band-add/band-add.component';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { BandEditComponent } from './band-edit/band-edit.component';
import { BandStatisticsComponent } from './band-statistics/band-statistics.component';
import { AboutBandComponent } from './about-band/about-band.component';


const routes: Routes = [
  ({ path: '', component: BandListComponent }),
  ({ path: 'band-list', component: BandListComponent }),
  ({ path: 'band-add', component: BandAddComponent }),
  ({ path: 'band-details/:id', component: BandDetailComponent }),
  ({ path: 'band-edit/:id', component: BandEditComponent }),
  ({ path: 'band-statistics', component: BandStatisticsComponent}),
  ({ path: 'about', component: AboutBandComponent }),
  ({ path: '**', redirectTo: '' }),
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }