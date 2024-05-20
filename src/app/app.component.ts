import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GenerateQuestionsService } from './features/generate/services/generate-questions.service';
import { FooterComponent } from './shared/features/footer/footer.component';
import { SupabaseService } from './core/services/supabase.service';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { filter, map, Observable } from 'rxjs';
import { AuthUser } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    RouterLink,
    NgOptimizedImage,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'brief-generation-poc';
  isAuthed$: Observable<boolean | AuthUser | null> = this.supabaseService.user$;

  constructor(
    private _gqs: GenerateQuestionsService,
    private _router: Router,
    private supabaseService: SupabaseService,
  ) {
    this._gqs.setFocusBackgroundSource$.subscribe((value) => {
      // set body element class
      document.body.classList.toggle('hasFocus', value);
    });
  }

  get hasFocusMode(): boolean {
    return this._gqs.setFocusBackgroundSource$.value;
  }

  ngOnInit() {}

  routeToGenerate() {
    this._router.navigate(['/generate']);
  }

  isAuthed() {
    return this.supabaseService.isAuthenticated();
  }

  logout() {
    this.supabaseService.signOutUser();
  }

  getInitials(): Observable<string> {
    return this.supabaseService.user$.pipe(
      filter((s) => !!s),
      map((user) => {
        if ((user as AuthUser).user_metadata) {
          const name = (user as AuthUser).user_metadata['name'];
          let initials;
          if (name)
            initials = name
              .split(' ')
              .map((n: string) => n[0])
              .join('');
          else return '';
          return initials.toUpperCase();
        }
        return '';
      }),
    );
  }
}
