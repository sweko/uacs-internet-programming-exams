import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { BandListComponent } from './band-list/band-list.component';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BandListComponent,
    BandDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [StudentService],
  bootstrap: [AppComponent],
})
export class AppModule {}