import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { GenresComponent } from './genres/genres.component';
import { ActorsComponent } from './actors/actors.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MoviesEditComponent } from './movies-edit/movies-edit.component';
import { MoviesCreateComponent } from './movies-create/movies-create.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MovieListComponent,
    MovieDetailsComponent,
    GenresComponent,
    ActorsComponent,
    StatisticsComponent,
    MoviesEditComponent,
    MoviesCreateComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
