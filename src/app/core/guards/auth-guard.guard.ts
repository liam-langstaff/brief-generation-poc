import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

export const authGuard: CanActivateFn = (route, state) => {
  const supabase = inject(SupabaseService);
  const user = supabase.supabase.auth.getUser();

  fromPromise(user).subscribe(async (user) => {
    if (!user) {
      // If there's no user, sign in
      console.log('hereee');
      await supabase.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `https://eamejbzsjhqyuakkxrxq.supabase.co/auth/v1/callback`,
        },
      });

      return false;
    } else {
      // if user exists, allow them to access the route
      return true;
    }
  });

  return true;
};
