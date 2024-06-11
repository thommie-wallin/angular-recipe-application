import { Routes } from '@angular/router';
import { HomeComponent } from './core';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'recipes',
    children: [
      { path: '', loadComponent: () => import('./features/recipes/components/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) },
      { path: ':id', loadComponent: () => import('./features/recipes/components/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent) }
    ]
  },
  { path: 'favourites', loadComponent: () => import('./features/favourites/components/favourites/favourites.component').then(m => m.FavouritesComponent) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];