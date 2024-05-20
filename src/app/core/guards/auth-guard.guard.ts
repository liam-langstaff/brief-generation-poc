import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { filter, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);
  return supabase.user$.pipe(
    filter((r) => r !== undefined),
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }),
  );
};
