import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';

const routes: Routes = [
  { path: 'band-list', component: BandListComponent },
  { path: '', redirectTo: '/band-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



import { BandsComponent } from './bands/bands.component';
import { BandDetailsComponent } from './band-details/band-details.component';
import { BandEditComponent } from './band-edit/band-edit.component';
import { BandCreateComponent } from './band-create/band-create.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'bands', component: BandsComponent },
  { path: 'bands/:id', component: BandDetailsComponent },
  { path: 'bands/:id/edit', component: BandEditComponent },
  { path: 'bands/create', component: BandCreateComponent },
  { path: 'country/:id', component: CountryDetailsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/bands', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
