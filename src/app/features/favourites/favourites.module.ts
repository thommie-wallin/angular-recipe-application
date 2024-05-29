import { NgModule } from '@angular/core';
import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './components/favourites/favourites.component';

@NgModule({
  imports: [FavouritesRoutingModule, FavouritesComponent],
})
export class FavouritesModule { }
