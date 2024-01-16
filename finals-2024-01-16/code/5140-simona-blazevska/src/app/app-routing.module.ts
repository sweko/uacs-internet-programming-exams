import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandDetailComponent } from './band-detail/band-detail.component';

const routes: Routes = [
  { path: 'band-list', component: BandListComponent },
  { path: 'band-list/:id', component: BandDetailComponent },
  { path: '', redirectTo: '/band-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}