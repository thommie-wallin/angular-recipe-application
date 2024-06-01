import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { Recipe } from 'app/features/recipes';
import { FavouritesService } from '../../services/favourite-state.service';
import { ResponsiveService } from 'app/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDividerModule, RouterModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  private favouritesService = inject(FavouritesService);
  private snackBar = inject(MatSnackBar);
  private responsiveService = inject(ResponsiveService);
  favourites = this.favouritesService.state;

  private breakpointObserver = inject(BreakpointObserver);

  // Angular Material Grid list: Columns per viewportsize in media queries.
  cols: string;
  // gridColumns: string;

  ngOnInit() {
    this.responsiveService.cols$.subscribe(cols => this.cols = cols);
    console.log(this.cols);

    // this.breakpointObserver.observe([
    //   Breakpoints.XSmall,
    //   Breakpoints.Small,
    //   Breakpoints.Medium,
    //   Breakpoints.Large,
    //   Breakpoints.XLarge
    // ]).pipe(
    //   map(result => {
    //     if (result.breakpoints[Breakpoints.XSmall]) {
    //       return '1fr';
    //     } else if (result.breakpoints[Breakpoints.Small]) {
    //       return '1fr';
    //     } else if (result.breakpoints[Breakpoints.Medium]) {
    //       return '1fr';
    //     } else if (result.breakpoints[Breakpoints.Large]) {
    //       return 'repeat(3, 1fr)';
    //     } else if (result.breakpoints[Breakpoints.XLarge]) {
    //       return 'repeat(5, 1fr)';
    //     } else {
    //       return 'repeat(5, 1fr)'; // Default to 5 columns if no match
    //     }
    //   })
    // ).subscribe(columns => this.gridColumns = columns);
  };

  // ngOnChanges() {
  //   console.log(this.favourites());
    
  // }

  removeFromFavourites(recipe: Recipe) {
    this.favouritesService.removeFromFavourites(recipe);
    this.snackBar.open('Recipe removed from favourites.', 'OK', {
      duration: 3000
    });
  };

  removeAllFromFavourites() {
    this.favouritesService.removeAllFromFavourites();
    this.snackBar.open('All recipes removed from favourites.', 'OK', {
      duration: 3000
    });
  };
};