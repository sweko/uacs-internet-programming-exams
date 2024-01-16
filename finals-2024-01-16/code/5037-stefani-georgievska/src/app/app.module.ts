import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { BandListComponent } from './band-list/band-list.component';
import { GenresComponent } from './genres/genres.component';
import { PlaceListComponent } from './place/place/place.component';
import { BandComponent } from './band-create/band/band.component';
import { StatisticsComponent } from './statistics/statistics/statistics.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { BandEditComponent } from './band-edit/band-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BandListComponent,
    GenresComponent,
    PlaceListComponent,
    BandComponent,
    StatisticsComponent,
    AboutComponent,
    BandEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
