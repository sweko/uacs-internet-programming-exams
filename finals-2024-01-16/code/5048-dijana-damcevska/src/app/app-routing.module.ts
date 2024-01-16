import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './components/band-list/band-list.component';
import { BandEditComponent } from './components/band-edit/band-edit.component';
import { BandDetailsComponent } from './components/band-details/band-details.component';
import { BandCreateComponent } from './components/band-create/band-create.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [ { path: 'bands', component: BandListComponent },
{ path: '', redirectTo: '/bands', pathMatch: 'full' },
 { path: "bands/create", component: BandCreateComponent},
 { path: "bands/:id", component: BandDetailsComponent},
 { path: "bands/:id/edit", component: BandEditComponent},
 { path: "statistics", component: StatisticsComponent},
 { path: "about", component: AboutComponent },
{ path: "**", redirectTo: "/band-list"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
