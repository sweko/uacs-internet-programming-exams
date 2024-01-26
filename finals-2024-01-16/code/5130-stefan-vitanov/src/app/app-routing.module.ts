import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandCreateComponent } from './band-create/band-create.component';
import { BandEditComponent } from './band-edit/band-edit.component';
import { BandDetailsComponent } from './band-details/band-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';
import { CountryDetailsComponent } from './country-details/country-details.component';

const routes: Routes = [
  { path: 'bands/create', component: BandCreateComponent },
  { path: 'bands/:id/edit', component: BandEditComponent },
  { path: 'bands/:id', component: BandDetailsComponent },
  { path: 'bands', component: BandListComponent },
  { path: 'country/:id', component: CountryDetailsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/bands', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
