import { Routes } from '@angular/router';
import { HomeComponent } from './core';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'browse',
    children: [
      { path: '', loadComponent: () => import('./features/browse/components/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) },
      { path: 'recipe/:id', loadComponent: () => import('./features/browse/components/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent) }
    ]
  },
  { path: 'favourites', loadComponent: () => import('./features/favourites/components/favourite-list/favourite-list.component').then(m => m.FavouritesListComponent) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
