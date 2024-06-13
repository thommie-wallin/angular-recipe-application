import { Component, inject } from '@angular/core';
import { GlobalStateService } from '../../../state';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  private globalStateService = inject(GlobalStateService);
  error = this.globalStateService.error;
}
