import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../../features/recipes';
import { FavouriteButtonComponent } from '../favourite-button/favourite-button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, RouterModule, FavouriteButtonComponent],
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