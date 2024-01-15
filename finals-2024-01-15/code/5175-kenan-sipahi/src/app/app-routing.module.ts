import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/movie-list', pathMatch: 'full' },
  { path: 'movie-list', component: MovieListComponent },
  { path: 'movie-create', component: MovieCreateComponent},
  { path: 'movie/:id', component: MovieDetailsComponent},
  { path: 'movie/:id/edit', component: MovieEditComponent},
  { path: 'actor-details/:id', component: ActorDetailsComponent },
  { path: 'statistics', component: StatisticsComponent},
  { path: 'about-me', component: AboutMeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }