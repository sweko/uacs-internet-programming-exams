import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MoviesService } from './movies.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortPipe } from './common/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieEditComponent,
    MovieCreateComponent,
    ActorDetailsComponent,
    StatisticsComponent,
    AboutMeComponent,
    ActorDetailsComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  
  ],
  providers: [
    StudentService,
    MoviesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }