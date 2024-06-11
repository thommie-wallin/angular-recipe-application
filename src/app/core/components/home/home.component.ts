import { Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HomeCard, ResponsiveService } from '../../services/responsive.service';

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
  private responsiveService = inject(ResponsiveService);
  cards: HomeCard[] = [];

  ngOnInit(): void {
    this.responsiveService.homeCards$.subscribe(cards => this.cards = cards);
  };
}
