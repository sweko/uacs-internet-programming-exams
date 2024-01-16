import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { BandListComponent } from './band-list/band-list.component';
import { StatisticsComponentComponent } from './statistics-component/statistics-component.component';
import { NavigationBarComponent } from './navigation-bar-component/navigation-bar-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BandListComponent,
    StatisticsComponentComponent,
    NavigationBarComponent,
    FooterComponentComponent,
   

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