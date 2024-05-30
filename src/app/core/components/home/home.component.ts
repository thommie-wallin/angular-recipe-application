import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule, 
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards$;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    /** Based on the screen size, switch from standard to one column per row */
    this.cards$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: `Search for recipes`, cols: 2, rows: 1, image: '../../assets/images/fish.jpg' },
          { title: 'Save your favourites', cols: 2, rows: 1, image: '../../assets/images/pancake.jpg' },
          { title: 'Inspiration', cols: 2, rows: 1, image: '../../assets/images/lemon.jpg' },
        ];
      }

      return [
        { title: `Search for recipes`, cols: 2, rows: 1, image: '../../assets/images/fish.jpg' },
        { title: 'Save your favourites', cols: 1, rows: 1, image: '../../assets/images/pancake.jpg' },
        { title: 'Inspiration', cols: 1, rows: 1, image: '../../assets/images/lemon.jpg' },
      ];
    })
  );
  };
}
