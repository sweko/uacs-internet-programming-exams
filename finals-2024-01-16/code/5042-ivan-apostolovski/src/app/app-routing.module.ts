import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandDetailsComponent } from './band-details/band-details.component';
import { BandEditComponent } from './band-edit/band-edit.component';
import { AddBandComponent } from './add-band/add-band.component';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
  { path: '', redirectTo: '/band-list', pathMatch: 'full' },
  { path: 'band-list', component: BandListComponent },
  { path: 'band/add', component: AddBandComponent },
  { path: "band/:id", component: BandDetailsComponent },
  { path: "band/:id/edit", component: BandEditComponent },
  { path: 'about-me', component: AboutMeComponent},
  { path: "**", redirectTo: "/band-list" },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
