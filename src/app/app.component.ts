import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GenerateQuestionsService } from './features/generate/services/generate-questions.service';
import { FooterComponent } from './shared/features/footer/footer.component';
import { SupabaseService } from './core/services/supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'brief-generation-poc';

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

  routeToGenerate() {
    this._router.navigate(['/generate']);
  }
}
