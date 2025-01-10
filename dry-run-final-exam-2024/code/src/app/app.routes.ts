import { Routes } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'authors', pathMatch: 'full' },
    { path: 'authors', component: AuthorListComponent },
    { path: 'authors/:id', component: AuthorDetailsComponent },
    { path: 'authors/:id/edit', component: AuthorEditComponent },
    { path: '**', redirectTo: 'authors' }
];
