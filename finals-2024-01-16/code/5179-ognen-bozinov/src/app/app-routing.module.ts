import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandAddComponent } from './band-add/band-add.component';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { BandEditComponent } from './band-edit/band-edit.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
const routes: Routes = [
  
  { path: '', component: BandListComponent },
  { path: 'band-list', component: BandListComponent },
  { path: 'band-add', component: BandAddComponent },
  { path: 'band-details/:id', component: BandDetailComponent },
  { path: 'band-edit/:id', component: BandEditComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'country-details/:id', component: CountryDetailsComponent },
  { path: '**', redirectTo: '' },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }
 }