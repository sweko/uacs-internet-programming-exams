import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentService } from './services/student.service';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailsComponent,
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
