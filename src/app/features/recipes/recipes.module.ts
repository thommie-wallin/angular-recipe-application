import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  imports: [
    RecipesRoutingModule,
    RecipeListComponent,
    RecipeDetailComponent,
  ],
})
export class RecipesModule { }
