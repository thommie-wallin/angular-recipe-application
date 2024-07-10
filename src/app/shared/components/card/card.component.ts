import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../../features/browse';
import { FavouriteButtonComponent } from '../favourite-button/favourite-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, RouterModule, FavouriteButtonComponent, MatIconModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() recipe: Recipe = {
    id: '',
    title: '',
    imageUrl: '',
    api: ''
  };
};