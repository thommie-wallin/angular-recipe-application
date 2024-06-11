import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { ResponsiveService } from '../../../core';

@Component({
  selector: 'app-grid-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule, CardComponent],
  templateUrl: './grid-list.component.html',
  styleUrl: './grid-list.component.css'
})
export class GridListComponent implements OnInit {
  private responsiveService = inject(ResponsiveService);
  currentStyles: Record<string, string> = {};

  ngOnInit(): void {
    this.responsiveService.cols$.subscribe(cols => {
      this.currentStyles = {
        'grid-template-columns': cols,
        'grid-auto-rows': '1fr'
      };
    });
  };
};
