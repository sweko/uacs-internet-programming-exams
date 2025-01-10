import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorCreateComponent } from './author-create/author-create.component';

const routes: Routes = [
  { path: "", redirectTo: "/authors", pathMatch: "full" },
  { path: "authors", component: AuthorListComponent },
  { path: "authors/create", component: AuthorCreateComponent },
  { path: "authors/:id", component: AuthorDetailsComponent },
  { path: "authors/:id/edit", component: AuthorEditComponent },
  { path: "statistics", component: AuthorEditComponent },
  { path: "**", redirectTo: "/authors" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
