import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { BandListComponent } from './band-list/band-list.component';
import { BandComponent } from './band/band.component';
import { BandDetailsComponent } from './band-details/band-details.component';
import { BandFormComponent } from './band-form/band-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BandEditComponent } from './band-edit/band-edit.component';
import { BandCreateComponent } from './band-create/band-create.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';
import { CountryDetailsComponent } from './country-details/country-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BandListComponent,
    BandComponent,
    BandDetailsComponent,
    BandFormComponent,
    BandEditComponent,
    BandCreateComponent,
    StatisticsComponent,
    AboutComponent,
    CountryDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
