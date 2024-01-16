import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { BandListComponent } from './band-list/band-list.component';
import { AboutComponent } from './about/about.component';
import { BandComponent } from './band/band.component';
import { BandDetailComponent } from './band-details/band-details.component';
import { BandFormComponent } from './band-form/band-form.component';
import { BandCreateComponent } from './band-create/band-create.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BandEditComponent } from './band-edit/band-edit.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { BandAddComponent } from './band-add/band-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BandListComponent,
    AboutComponent,
    BandComponent,
    BandDetailComponent,
    BandFormComponent,
    BandCreateComponent,
    ConfirmationDialogComponent,
    StatisticsComponent,
    BandEditComponent,
    CountryDetailsComponent,
    BandAddComponent,
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
