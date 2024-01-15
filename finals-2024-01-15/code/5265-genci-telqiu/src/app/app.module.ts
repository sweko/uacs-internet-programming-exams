import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieService } from './services/movie.service';
import { FormsModule } from '@angular/forms';
import { KeyValuePipe } from './keyvalue.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MovieListComponent,
    KeyValuePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    StudentService,
    MovieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
