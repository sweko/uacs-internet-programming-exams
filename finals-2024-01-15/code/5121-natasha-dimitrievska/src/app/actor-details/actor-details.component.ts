import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule, // Include CommonModule here
  ],
  bootstrap: [MovieDetailsComponent],
})
export class AppModule { }
