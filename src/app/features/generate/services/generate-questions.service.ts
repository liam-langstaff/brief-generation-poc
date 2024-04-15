import { Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GenerateQuestionsService {

  private isTypingSource = new BehaviorSubject(false);
  isTyping$ = this.isTypingSource.asObservable();
  setFocusBackgroundSource$ = new BehaviorSubject<boolean>(false);

  setIsTyping(value: boolean) {
    this.isTypingSource.next(value);
  }

  setFocusBackground(setFocus: boolean) {
    this.setFocusBackgroundSource$.next(setFocus);
  }


}
