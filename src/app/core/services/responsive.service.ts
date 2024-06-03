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

interface GridByBreakpoint {
  xl: string;
  lg: string;
  md: string;
  sm: string;
  xs: string;
}

interface ColsByBreakpoint {
  xl: number;
  lg: number;
  md: number;
  sm: number;
  xs: number;
}


@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private breakpointObserver = inject(BreakpointObserver);

  // Columns in gridlist.
  private gridByBreakpoint: GridByBreakpoint = {
    xl: 'repeat(5, 1fr)',
    lg: 'repeat(4, 1fr)',
    md: 'repeat(3, 1fr)',
    sm: 'repeat(2, 1fr)',
    xs: '1fr'
  };

  // Columns in a angular material gridlist.
  private colsByBreakpoint: ColsByBreakpoint = {
    xl: 5,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
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

  // Columns for grid-list component.
  private colsSubject = new BehaviorSubject<string>(this.gridByBreakpoint.xl);
  cols$: Observable<string> = this.colsSubject.asObservable();

  private colsNrSubject = new BehaviorSubject<number>(this.colsByBreakpoint.xl);
  colsNr$: Observable<number> = this.colsNrSubject.asObservable();

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
          this.colsNrSubject.next(this.colsByBreakpoint.xs);
          this.homeCardsSubject.next(this.homeCards.handset);
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.colsSubject.next(this.gridByBreakpoint.sm);
          this.colsNrSubject.next(this.colsByBreakpoint.sm);
          this.homeCardsSubject.next(this.homeCards.web);
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.colsSubject.next(this.gridByBreakpoint.md);
          this.colsNrSubject.next(this.colsByBreakpoint.md);
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.colsSubject.next(this.gridByBreakpoint.lg);
          this.colsNrSubject.next(this.colsByBreakpoint.lg);
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.colsSubject.next(this.gridByBreakpoint.xl);
          this.colsNrSubject.next(this.colsByBreakpoint.xl);
        }
      }
    });
  };
}
