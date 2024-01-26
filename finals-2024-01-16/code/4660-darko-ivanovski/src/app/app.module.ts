import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BandsService } from './services/bands.service';
import { BandDetailsComponent } from './components/band-details/band-details.component';
import { BandEditComponent } from './components/band-edit/band-edit.component';
import { BandCreateComponent } from './components/band-create/band-create.component';
import { BandCountryComponent } from './components/band-country/band-country.component';
import { BandStatisticsComponent } from './components/band-statistics/band-statistics.component';
import { BandListComponent } from './components/band-list/band-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BandListComponent,
    BandDetailsComponent,
    BandEditComponent,
    BandCreateComponent,
    BandCountryComponent,
    BandStatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    BandsService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
