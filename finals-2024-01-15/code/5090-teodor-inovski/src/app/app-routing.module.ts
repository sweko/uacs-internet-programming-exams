import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'movie-list', component: MovieListComponent },
  { path: '', redirectTo: '/movie-list', pathMatch: 'full' },
  { path: 'movies/create', component:CreateComponent},
  { path: 'movies/:id', component: DetailsComponent},
  { path: 'movies/:id/edit', component:EditComponent},
  { path: 'actor/:id', component: ActorDetailsComponent},
  { path: 'statistics', component:StatisticsComponent},
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
