// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandDetailsComponent } from './band-details-component/band-details-component.component';
import { BandEditComponent } from './band-edit-component/band-edit-component.component';
import { BandCreateComponent } from './band-create-component/band-create-component.component';
import { CountryDetailsComponent } from './country-detail-component/country-detail-component.component';
import { BandsService } from './services/band.service';
const routes: Routes = [
  { path: '', component: BandListComponent },
  { path: 'bands/:id', component: BandDetailsComponent },
  { path: 'bands/:id/edit', component: BandEditComponent },
  { path: 'bands/:id/create', component: BandCreateComponent },
  { path: 'countries/:id', component: CountryDetailsComponent },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    BandsService,
  ],
})
export class AppRoutingModule { }


