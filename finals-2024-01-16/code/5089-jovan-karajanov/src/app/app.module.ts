import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { BandListComponent } from './band-list/band-list.component';
import { GenreComponent } from './genres/genre/genre.component';

import { BandComponent } from './band-create/band/band.component';
import { StatisticsComponent } from './statistics/statistics/statistics.component';
import { AboutComponent } from './about/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { BandEditComponent } from './band-edit/band-edit/band-edit.component';
import { CommonModule } from '@angular/common';

import { PlaceListComponent } from './place-list/place-list/place-list.component';
import { SortPipe } from './sort-pipe/pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BandListComponent,
    GenreComponent,
    SortPipe,

    BandComponent,
    StatisticsComponent,
    AboutComponent,
    BandEditComponent,
    PlaceListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
     
  ],
  providers: [
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
