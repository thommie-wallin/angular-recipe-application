import { Component, inject } from '@angular/core';
import { GlobalStateService } from '../../../state';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  private globalStateService = inject(GlobalStateService);
  loading = this.globalStateService.loading;
};