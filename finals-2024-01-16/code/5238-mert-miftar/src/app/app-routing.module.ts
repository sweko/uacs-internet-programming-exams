import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandCreateComponent } from './band-create/band-create.component';
import { BandDetailsComponent } from './band-details/band-details.component';
import { BandEditComponent } from './band-edit/band-edit.component';
import { BandAboutComponent } from './band-about/band-about.component';
import { BandStatisticsComponent } from './band-statistics/band-statistics.component';


const routes: Routes = [
  { path: 'bands', component: BandListComponent },
  { path: 'band-create', component: BandCreateComponent },
  { path: 'band-edit/:id', component: BandEditComponent },
  { path: 'about', component: BandAboutComponent },
  { path: 'statistics', component: BandStatisticsComponent },
  { path: 'band-details/:id', component: BandDetailsComponent },
  { path: '', redirectTo: '/bands', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
