import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BandListComponent } from './band-list/band-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BandCreateComponent } from './band-create/band-create.component';
import { BandEditComponent } from './band-edit/band-edit.component';
import { BandDetailsComponent } from './band-details/band-details.component';
import { BandAboutComponent } from './band-about/band-about.component';
import { BandStatisticsComponent } from './band-statistics/band-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BandListComponent,
    BandCreateComponent,
    BandEditComponent,
    BandDetailsComponent,
    BandAboutComponent,
    BandStatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
