import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthorListComponent,
    FooterComponent,
    AuthorDetailsComponent,
    AuthorEditComponent,
    AuthorCreateComponent,
    StatisticsComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
