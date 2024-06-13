import { Injectable, computed, signal } from '@angular/core';
import { GlobalState } from './models/global-state.model';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private state = signal<GlobalState>({
    loading: false,
    error: null,
  });

  // Selectors
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  // Sources
  loading$ = new Subject<boolean>();
  error$ = new Subject<string | null>();
  
  constructor() {
    this.loading$.pipe(takeUntilDestroyed()).subscribe((loading) =>
      this.state.update((state) => ({
        ...state,
        loading: loading,
      }))
    );

    this.error$.pipe(takeUntilDestroyed()).subscribe((error) =>
      this.state.update((state) => ({
        ...state,
        error: error,
      }))
    );
  };

  setLoading(loading: boolean): void {
    this.loading$.next(loading);
  }

  setError(error: string | null): void {
    this.error$.next(error);
  }
}
