import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BandListComponent } from './band-list/band-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BandAddComponent } from './band-add/band-add.component';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { BandEditComponent } from './band-edit/band-edit.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { SortArrayPipe } from './sort-array.pipe';
import { SortAlphabeticallyPipe } from './sort-alphabetically.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BandListComponent,
    BandAddComponent,
    BandDetailComponent,
    BandEditComponent,
    AboutPageComponent,
    StatisticsComponent,
    CountryDetailsComponent,
    SortArrayPipe,
    SortAlphabeticallyPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }