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
  {
    path: 'user-recipes',
    children: [
      { path: '', loadComponent: () => import('./features/user-recipes/components/user-recipes-list/user-recipes-list.component').then(m => m.UserRecipesListComponent) },
      { path: 'create', loadComponent: () => import('./features/user-recipes/components/user-recipe-create/user-recipe-create.component').then(m => m.UserRecipeCreateComponent) },
      { path: 'edit/:id', loadComponent: () => import('./features/user-recipes/components/user-recipe-edit/user-recipe-edit.component').then(m => m.UserRecipeEditComponent) },
      { path: 'detail/:id', loadComponent: () => import('./features/user-recipes/components/user-recipe-detail/user-recipe-detail.component').then(m => m.UserRecipeDetailComponent) }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
