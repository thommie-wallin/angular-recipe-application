import { Component, inject } from '@angular/core';
import { GlobalStateService } from '../../../state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  private globalStateService = inject(GlobalStateService);
  loading = this.globalStateService.loading;
};