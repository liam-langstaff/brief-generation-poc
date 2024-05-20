import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { SupabaseService } from './core/services/supabase.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeSupabase,
      multi: true,
      deps: [SupabaseService],
    },
    provideAnimationsAsync(),
  ],
};

export function initializeSupabase(supabaseService: SupabaseService) {
  return () => {
    return supabaseService.setupSupabase();
  };
}
