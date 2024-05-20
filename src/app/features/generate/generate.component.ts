import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { BehaviorSubject, skipWhile, Subject } from 'rxjs';
import { QuestionsComponent } from './questions/questions.component';
import { GenerateQuestionsService } from './services/generate-questions.service';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { TypingDirective } from '../../shared/directives/typing.directive';
import { Router } from '@angular/router';

export interface Question {
  id: number;
  title: string;
  subText: string;
  partText: string;
  apiContext: string;
  className: string;
}

export interface QuestionSet {
  order: number;
  completed: boolean;
  questions: Question[];
}

interface GenerateQuestionnaire {
  sets: QuestionSet[];
}

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [QuestionsComponent, AsyncPipe, NgIf, NgStyle, TypingDirective],
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateComponent implements OnInit, OnDestroy {
  overviewStringParts: { part: string; className: string }[] = [];
  typingTrigger = new Subject<void>();
  // Indicates if all questions were answered
  allQuestionsAnswered = false;
  // Indicates if the overview is shown in the middle
  overviewInMiddle = false;
  questionData: GenerateQuestionnaire = {
    sets: [
      {
        order: 0,
        completed: false,
        questions: [
          {
            id: 1,
            title: 'Design',
            subText: 'Designing websites or web apps',
            partText: 'design a new app or website',
            apiContext: 'design',
            className: 'set1',
          },
          {
            id: 2,
            title: 'Develop',
            subText: 'Developing websites or web apps',
            partText: 'develop a new app or website',
            apiContext: 'develop',
            className: 'set1',
          },
        ],
      },
      {
        order: 1,
        completed: false,
        questions: [
          {
            id: 3,
            title: 'Beginner',
            subText: `I'm new to this.`,
            partText: `as I'm a beginner`,
            apiContext: 'design',
            className: 'set2',
          },
          {
            id: 4,
            title: 'Intermediate',
            subText: `I've done this before.`,
            partText: `as I'm a looking to touch up on my skills`,
            apiContext: 'develop',
            className: 'set2',
          },
          {
            id: 5,
            title: 'Professional',
            subText: `I'm well seasoned.`,
            partText: `as I'm looking for a new challenge`,
            apiContext: 'develop',
            className: 'set2',
          },
        ],
      },
      {
        order: 2,
        completed: false,
        questions: [
          {
            id: 5,
            title: 'Small',
            subText: `I'm looking for a quick challenge`,
            partText: 'and want something small.',
            apiContext: 'design',
            className: 'set3',
          },
          {
            id: 6,
            title: 'Medium',
            subText: `I'm looking for something that will challenge me`,
            partText: 'and want something that will challenge me.',
            apiContext: 'develop',
            className: 'set3',
          },
          {
            id: 7,
            title: 'Large',
            subText: `I'm looking for a large project.`,
            partText:
              'and want something that will truly mimic a client project.',
            apiContext: 'develop',
            className: 'set3',
          },
        ],
      },
      {
        order: 3,
        completed: false,
        questions: [
          {
            id: 7,
            title: `I'd like a reference design`,
            subText:
              'Briefforge can generate a reference landing page to give you some inspiration',
            partText: `I'd also like a reference landing page to give me some inspiration.`,
            apiContext: 'design',
            className: 'set4',
          },
          {
            id: 8,
            title: 'Just give me the brief',
            subText: 'The brief is more than enough for me',
            partText: `The brief is more than enough to get me started.`,
            apiContext: 'develop',
            className: 'set4',
          },
        ],
      },
    ],
  };
  currentSet$: BehaviorSubject<QuestionSet> = new BehaviorSubject(
    this.questionData.sets[0],
  );
  isGenerating$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentPartIndex = 0;
  private currentStringIndex = 0;
  private currentSetIndex = 0;

  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    private el: ElementRef,
    private _gqs: GenerateQuestionsService,
    private _router: Router,
  ) {
    this.startTyping();

    this.checkIfRegen();

    this.isGenerating$.pipe(skipWhile((val) => !val)).subscribe((val) => {
      // if (!val) this._gqs.setFocusBackgroundSource$.next(false);
    });
  }

  get canNextSet(): boolean {
    const currentStep = this.questionData.sets[this.currentSetIndex];
    const hasNextStep = this.questionData.sets[this.currentSetIndex + 1];
    return (
      hasNextStep &&
      (hasNextStep.completed ||
        (currentStep.completed && !hasNextStep.completed))
    );
  }

  get canPreviousSet(): boolean {
    return this.currentSetIndex - 1 !== -1;
  }

  checkIfRegen() {
    this._gqs.isGenerating$.subscribe((isRegen) => {
      if (isRegen) {
        this._gqs.setFocusBackground(true);
        this.startGeneration();
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this._gqs.setFocusBackground(false);
  }

  completeStep(index: number) {
    this.questionData.sets[index].completed = true;
  }

  previousSet() {
    if (this.currentSetIndex - 1 !== -1) {
      this.allQuestionsAnswered = false;
      this._gqs.setFocusBackground(false);
      this.currentSetIndex--;
      this.currentSet$.next(this.questionData.sets[this.currentSetIndex]);
    }
  }

  nextSet() {
    const currentStep = this.questionData.sets[this.currentSetIndex];
    const hasNextStep = this.questionData.sets[this.currentSetIndex + 1];

    if (
      hasNextStep &&
      (hasNextStep.completed ||
        (currentStep.completed && !hasNextStep.completed))
    ) {
      this.currentSetIndex++;
      this.currentSet$.next(this.questionData.sets[this.currentSetIndex]);
    }
  }

  startTyping() {
    this.typingTrigger.subscribe(() => {
      if (this.currentPartIndex < this.overviewStringParts.length) {
        this._gqs.setIsTyping(true);
        const parent = this.el.nativeElement.querySelector('#includer');
        const typingElement = this.renderer.createElement('span');
        this.renderer.addClass(
          typingElement,
          this.overviewStringParts[this.currentPartIndex].className,
        );
        this.renderer.appendChild(parent, typingElement);

        const word = this.overviewStringParts[this.currentPartIndex].part;

        const interval = setInterval(() => {
          if (this.currentStringIndex < word.length) {
            this.renderer.appendChild(
              typingElement,
              this.renderer.createText(word[this.currentStringIndex]),
            );
            this.currentStringIndex++;
            this.cd.markForCheck();
          } else {
            clearInterval(interval);
            this.renderer.appendChild(parent, this.renderer.createText(' '));
            this.currentPartIndex++;
            this.currentStringIndex = 0;
            this._gqs.setIsTyping(false);

            if (this.currentPartIndex < this.overviewStringParts.length) {
              this.typingTrigger.next();
            }
          }
        }, 50);
      }
    });
  }

  completeSet($event: { part: string; className: string; id: number }) {
    const existingPart = this.overviewStringParts[this.currentSetIndex];

    // Only process if the new part differs from the existing part
    if (!existingPart || existingPart.part !== $event.part) {
      // Replace the existing part at the current index, or append a new one if it doesn't exist yet
      this.overviewStringParts.splice(this.currentSetIndex, 1, {
        part: $event.part,
        className: $event.className,
      });
      if (this.questionData.sets[this.currentSetIndex].completed) {
        this.typeReplacementWord({
          part: $event.part,
          className: $event.className,
        });
      }
      // Mark current set as complete
      this.completeStep(this.currentSetIndex);
      this.cd.detectChanges();
    }

    // Navigate to the next set if there is one
    const hasNextStep = this.questionData.sets[this.currentSetIndex + 1];
    if (hasNextStep) {
      this.currentSetIndex++;
      this.currentSet$.next(this.questionData.sets[this.currentSetIndex]);
    } else {
      this.endOfSets();
    }
  }

  startGeneration() {
    this.isGenerating$.next(true);
    setTimeout(() => {
      this.isGenerating$.next(false);
      this._gqs.isGenerating$.next(false);
      // route to /result with route data id
      this._router.navigate([
        '/result',
        { id: this.questionData.sets[0].questions[0].id },
      ]);
    }, 6000);
  }

  private endOfSets() {
    this.allQuestionsAnswered = true;
    this._gqs.setFocusBackground(true);
    this.currentSetIndex++;

    // Wait for a duration, then move the overview to the middle
    setTimeout(() => {
      this.overviewInMiddle = true;
      this.cd.detectChanges();
    }, 2000); // You can adjust the timeout duration as needed
  }

  private typeReplacementWord(param: { part: string; className: string }) {
    this.typingTrigger.next();
    this._gqs.setIsTyping(true);
    const parent = this.el.nativeElement.querySelector('#includer');
    const typingElement = this.renderer.createElement('span');
    this.renderer.addClass(typingElement, param.className);
    // find the element to replace
    const elementToReplace = parent.querySelector(`.${param.className}`);
    if (elementToReplace) {
      this.renderer.removeChild(parent, elementToReplace);
    }
    // append to the order in which it was removed from
    this.renderer.insertBefore(parent, typingElement, elementToReplace);
    // this.renderer.appendChild(parent, typingElement);

    const word = param.part;

    const interval = setInterval(() => {
      if (this.currentStringIndex < word.length) {
        this.renderer.appendChild(
          typingElement,
          this.renderer.createText(word[this.currentStringIndex]),
        );
        this.currentStringIndex++;
        this.cd.markForCheck();
      } else {
        clearInterval(interval);
        this.renderer.appendChild(parent, this.renderer.createText(' '));
        this.currentStringIndex = 0;
        this._gqs.setIsTyping(false);
      }
    }, 50);
  }
}
