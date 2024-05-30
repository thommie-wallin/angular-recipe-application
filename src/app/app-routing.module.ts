import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// const routes: Routes = [
//   { path: '', pathMatch: 'full', component: HomeComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'recipes', component: RecipesComponent },
//   { path: 'recipe/:id', component: RecipeDisplayComponent },
//   { path: 'favourites', component: FavouritesComponent },
//   { path: '**', component: HomeComponent },
// ];

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'recipes', loadChildren: () => import('./features/recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'favourites', loadChildren: () => import('./features/favourites/favourites.module').then(m => m.FavouritesModule) },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
