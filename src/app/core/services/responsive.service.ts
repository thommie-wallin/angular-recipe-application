import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface HomeCard {
  title: string;
  cols: number;
  rows: number;
  image: string;
};

interface HomeCards {
  handset: HomeCard[];
  web: HomeCard[];
};

// interface GridByBreakpoint {
//   xl: number;
//   lg: number;
//   md: number;
//   sm: number;
//   xs: number;
// }


@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private breakpointObserver = inject(BreakpointObserver);

  // Columns in a angular material gridlist.
  private gridByBreakpoint = {
    xl: 'repeat(5, 1fr);',
    lg: 'repeat(4, 1fr);',
    md: 'repeat(3, 1fr);',
    sm: '1fr;',
    xs: '1fr;'
  };

  // Home component cards composition for handset (max-width: 599.98px) and web (min-width: 600px).
  private homeCards: HomeCards = {
    handset: [
      { title: `Search for recipes`, cols: 2, rows: 1, image: '../../assets/images/fish.jpg' },
      { title: 'Save your favourites', cols: 2, rows: 1, image: '../../assets/images/pancake.jpg' },
      { title: 'Inspiration', cols: 2, rows: 1, image: '../../assets/images/lemon.jpg' },
    ],
    web: [
      { title: `Search for recipes`, cols: 2, rows: 1, image: '../../assets/images/fish.jpg' },
      { title: 'Save your favourites', cols: 1, rows: 1, image: '../../assets/images/pancake.jpg' },
      { title: 'Inspiration', cols: 1, rows: 1, image: '../../assets/images/lemon.jpg' },
    ]
  };

  private colsSubject = new BehaviorSubject<string>('');
  cols$: Observable<string> = this.colsSubject.asObservable();

  private homeCardsSubject = new BehaviorSubject<HomeCard[]>(this.homeCards.web);
  homeCards$: Observable<HomeCard[]> = this.homeCardsSubject.asObservable();

  constructor() {
    // Angular Material Component Dev Kit (CDK): Layout behaviour primitives with Material Designs breakpoint system. 
    // The breakpointobserver utility with the observe method evaluate default media queries from the breakpoint system 
    // which will emit when one of them changes its boolean value. If a media query emits a boolean value of true, the different
    // if statements check which media querys condition is truthy. Then the cols variable is set to a corresponding number 
    // value from the gridByBreakpoint object.
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.colsSubject.next(this.gridByBreakpoint.xs);
          this.homeCardsSubject.next(this.homeCards.handset);
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.colsSubject.next(this.gridByBreakpoint.sm);
          this.homeCardsSubject.next(this.homeCards.web);
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.colsSubject.next(this.gridByBreakpoint.md);
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.colsSubject.next(this.gridByBreakpoint.lg);
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.colsSubject.next(this.gridByBreakpoint.xl);
        }
      }
    });
  };
}
