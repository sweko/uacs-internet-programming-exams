import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandCreateComponent } from './band-create/band-create.component';
import { BandDetailsComponent } from './band-details/band-details.component';
import { BandEditComponent } from './band-edit/band-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/band-list', pathMatch: 'full' },
  { path: 'band-list', component: BandListComponent },
  {path: "bands", component: BandListComponent},
  {path: "bands/create", component: BandCreateComponent},
  {path: "bands/:id", component: BandDetailsComponent},
  {path: "bands/:id/edit", component: BandEditComponent},
  {path: "**", redirectTo: "/bands"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
