import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { of, switchMap } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

export const authGuard: CanActivateFn = (route, state) => {
  const supabase = inject(SupabaseService);
  const user = supabase.supabase.auth.getUser();
  const callbackUrl = `https://${window.location.hostname}result;id=1`;
  // const callbackUrl = `https://eamejbzsjhqyuakkxrxq.supabase.co/auth/v1/callback`;
  return fromPromise(user).pipe(
    switchMap((u) => {
      console.log(u.data.user);
      if (!u.data.user) {
        return fromPromise(
          supabase.supabase.auth.signInWithOAuth({
            provider: 'google',
          }),
        ).pipe(
          switchMap((response) => {
            window.location.href = response.data.url as string;
            return of(true);
          }),
        );
      } else {
        return of(false); // if user is present, prevent navigation
      }
    }),
  );
};

export async function signInWithOAuth() {
  return await inject(SupabaseService).supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `https://eamejbzsjhqyuakkxrxq.supabase.co/auth/v1/callback`,
    },
  });
}
