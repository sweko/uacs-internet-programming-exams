import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RecipeService } from './services/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from './pipes/truncate.pipe';
import { TimeTransformPipe } from './pipes/time-transform.pipe';
import { RecipeDetailsComponent } from './recipe-list/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component';
import { CuisineService } from './services/cuisine.service';
import { FormsModule } from '@angular/forms';
import { RecipeCreateComponent } from './recipe-list/recipe-create/recipe-create.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientService } from './services/ingredient.service';
import { IngredientRecipesPipe } from './pipes/ingredient-recipes.pipe';
import { CuisineListComponent } from './cuisine-list/cuisine-list.component';
import { IngredientDetailsComponent } from './ingredient-list/ingredient-details/ingredient-details.component';
import { CuisineDetailsComponent } from './cuisine-list/cuisine-details/cuisine-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RecipeListComponent,
    NavBarComponent,
    TruncatePipe,
    TimeTransformPipe,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipeCreateComponent,
    IngredientListComponent,
    IngredientRecipesPipe,
    CuisineListComponent,
    IngredientDetailsComponent,
    CuisineDetailsComponent,
    StatisticsComponent,
    AboutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [StudentService, RecipeService, CuisineService, IngredientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
