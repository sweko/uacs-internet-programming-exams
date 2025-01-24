import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipecardComponent } from './components/recipecard/recipecard.component';
import { HttpClientModule } from '@angular/common/http';
import { StatisticsListComponent } from './statistics-list/statistics-list.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CuisinePageComponent } from './cuisine-page/cuisine-page.component';
import { IngredientsPageComponent } from './ingredients-page/ingredients-page.component';
import { RecipeDetailsPageComponent } from './recipe-details-page/recipe-details-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RecipeListComponent,
    RecipecardComponent,
    StatisticsListComponent,
    AboutPageComponent,
    CuisinePageComponent,
    IngredientsPageComponent,
    RecipeDetailsPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [StudentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
