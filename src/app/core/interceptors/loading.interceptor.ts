import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { GlobalStateService } from '../../state';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const globalStateService = inject(GlobalStateService);
  
  globalStateService.setLoading(true);
  return next(req).pipe(
    finalize(() => globalStateService.setLoading(false))
  );
};
