import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RecipesComponent } from './recipes.component';
import { MealtypeSelectComponent } from './mealtype-select/mealtype-select.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AllergeneSelectComponent } from './allergene-select/allergene-select.component';
import { DietSelectComponent } from './diet-select/diet-select.component';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';
import { InstructionsComponent } from './recipe-display/instructions/instructions.component';
import { IngredientsComponent } from './recipe-display/ingredients/ingredients.component';
import { PresentationComponent } from './recipe-display/presentation/presentation.component';




@NgModule({
  declarations: [
    RecipesComponent,
    MealtypeSelectComponent,
    RecipeListComponent,
    AllergeneSelectComponent,
    DietSelectComponent,
    RecipeDisplayComponent,
    InstructionsComponent,
    IngredientsComponent,
    PresentationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    FlexLayoutModule,
    MatListModule,
    MatSnackBarModule,
    MatInputModule,
    MatDividerModule,
  ]
})
export class RecipesModule { }
