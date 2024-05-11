import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FilterService } from 'app/core/services/filter.service';
import { API_FORM_FIELD, CATEGORY_FORM_FIELDS, RECIPE_API } from 'app/shared/constants/ui';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  api = API_FORM_FIELD;
  categories = CATEGORY_FORM_FIELDS;
  // apiItems = RECIPE_API;
  apiSelected: string;
  // Angular Material Grid list: Columns per viewportsize in media queries.
  cols: number;
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
  };

  constructor(private breakpointObserver: BreakpointObserver, private filterService: FilterService) {};

  ngOnInit(): void {
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
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });
  };
}
