import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { IngridientsListComponent } from './ingridients-list/ingridients-list.component';
import { CuisineListComponent } from './cuisine-list/cuisine-list.component';
import { IngridientsDetailsPageComponent } from './ingridients-details-page/ingridients-details-page.component';
import { CuisineDetailsPageComponent } from './cuisine-details-page/cuisine-details-page.component';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    IngridientsListComponent,
    CuisineListComponent,
    IngridientsDetailsPageComponent,
    CuisineDetailsPageComponent,
    StatisticsPageComponent,
    AboutPageComponent,
    RecipeCreateComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
