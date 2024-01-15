import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { MovieListComponent } from './movie-list/movie-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';
import { CastAddComponent } from './cast-add/cast-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MovieListComponent,
    StatisticsComponent,
    AboutComponent,
    CastAddComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'movies', component: MovieListComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'cast/add', component: CastAddComponent },
      { path: '', redirectTo: '/movies', pathMatch: 'full' },
    ]),
  ],
  providers: [
    StudentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
