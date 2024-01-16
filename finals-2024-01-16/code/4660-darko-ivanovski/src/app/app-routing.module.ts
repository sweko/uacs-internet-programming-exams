import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './components/band-list/band-list.component';
import { BandDetailsComponent } from './components/band-details/band-details.component';
import { BandEditComponent } from './components/band-edit/band-edit.component';
import { BandStatisticsComponent } from './components/band-statistics/band-statistics.component';

const routes: Routes = [
  { path: '', redirectTo: '/band-list', pathMatch: 'full' },
  { path: 'bands', redirectTo: '/band-list', pathMatch: 'full' },
  { path: 'band-list', component: BandListComponent },
  { path: 'band-details', component: BandDetailsComponent },
  { path: 'band-statistics', component: BandStatisticsComponent },
  { path: 'bands/:id', component: BandDetailsComponent },
  { path: 'band-edit', component: BandEditComponent },
  { path: 'bands/:id/edit', component: BandEditComponent },
  { path: "**", redirectTo: "/band-list" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
