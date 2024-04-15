import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges, OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {async, distinct, distinctUntilChanged, filter, Observable, Subject} from "rxjs";
import {GenerateQuestionsService} from "../services/generate-questions.service";
import {QuestionSet} from "../generate.component";
import {AsyncPipe, CommonModule} from "@angular/common";


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnInit {
  @Output() typingTrigger = new Subject<void>();
  @Output() emitQuestionPart$ = new Subject< {part: string, className: string, id: number}>();
  @Input() currentSet$: Observable<QuestionSet> | undefined;
  isTyping = false;
  constructor(private _gqs: GenerateQuestionsService, private _cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this._gqs.isTyping$.subscribe(v => {
      this.isTyping = v
      this._cd.detectChanges()
    });
  }

  addQuestionPart(part: string, className: string, id: number) {
      if (!this.isTyping) {
        this.emitQuestionPart$.next({part, className, id});
        this.typingTrigger.next();
      }
  }
}
