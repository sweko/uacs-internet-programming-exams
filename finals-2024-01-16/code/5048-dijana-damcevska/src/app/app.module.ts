import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StudentService } from './services/student/student.service';
import { BandListComponent } from './components/band-list/band-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BandDetailsComponent } from './components/band-details/band-details.component';
import { BandEditComponent } from './components/band-edit/band-edit.component';
import { BandCreateComponent } from './components/band-create/band-create.component';
import { BandService } from './services/band/band.service';
import { AboutComponent } from './components/about/about.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BandListComponent,
    BandDetailsComponent,
    BandEditComponent,
    BandCreateComponent,
    AboutComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    StudentService,
    BandService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
