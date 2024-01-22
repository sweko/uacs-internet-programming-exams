import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { movieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [
  { path: 'movie-list', component: movieListComponent },
  { path: '', redirectTo: '/movie-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
