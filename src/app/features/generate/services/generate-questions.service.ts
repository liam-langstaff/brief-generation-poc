import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenerateQuestionsService {
  setFocusBackgroundSource$ = new BehaviorSubject<boolean>(false);
  isGenerating$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  private isTypingSource = new BehaviorSubject(false);
  isTyping$ = this.isTypingSource.asObservable();

  setIsTyping(value: boolean) {
    this.isTypingSource.next(value);
  }

  // sets html and body class background
  setFocusBackground(setFocus: boolean) {
    this.setFocusBackgroundSource$.next(setFocus);
  }
}
