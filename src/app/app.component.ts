import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GenerateQuestionsService} from "./features/generate/services/generate-questions.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'brief-generation-poc';

  constructor(private _gqs: GenerateQuestionsService) {
    this._gqs.setFocusBackgroundSource$.subscribe(value => {
      // set body element class
      document.body.classList.toggle('hasFocus', value);
    });
  }

  get hasFocusMode(): boolean {
    return this._gqs.setFocusBackgroundSource$.value
  }
}
