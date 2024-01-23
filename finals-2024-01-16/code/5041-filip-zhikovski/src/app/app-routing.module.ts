import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { BandEditComponent } from './band-edit/band-edit.component';
import { BandAddComponent } from './band-add/band-add.component';

const routes: Routes = [
  { path: '', component: BandListComponent},
  { path: 'band-add', component: BandAddComponent},
  { path: 'band-list', component: BandListComponent},
  { path: 'band-details/:id', component: BandDetailComponent},
  { path: 'band-edit/:id', component: BandEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
