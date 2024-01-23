// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandCreateComponent } from './band-create/band-create.component';
import { BandDetailsComponent } from './band-details/band-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';
import { BandComponent } from './band/band.component';

const routes: Routes = [
  { path: '', redirectTo: '/band-list', pathMatch: 'full' },
  { path: 'band-list', component: BandListComponent },
  { path: 'band-create', component: BandCreateComponent},
  { path: 'band/:id', component: BandDetailsComponent},
  { path: 'band/:id/edit', component: BandComponent},
  { path: 'statistics', component: StatisticsComponent},
  { path: 'about-me', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
