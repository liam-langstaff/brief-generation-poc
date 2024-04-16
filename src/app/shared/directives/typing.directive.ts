import {Directive, ElementRef, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {fromEvent, interval, Subscription} from "rxjs";

@Directive({
  selector: '[appTyping]',
  standalone: true,
})
export class TypingDirective {

  @Input() text: string = '';
  @Input() typingSpeed: number = 200;  // greater is slower
  private currentIndex = 0;
  private subscription: Subscription | undefined;

  constructor(private el: ElementRef) { }

  // To start typing
  start(): void {
    // Define a source using rxjs 'interval' that fires every 'typingSpeed' milliseconds
    const source = interval(this.typingSpeed);
    this.subscription = source.subscribe(val => this.typeCharacter());
  }

  // To stop typing
  stop(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  /**
   * This will trigger every time the 'appTyping' input changes.
   * As 'ngOnChanges' lifecycle hook gets called before 'ngOnInit', we don't need to call 'start' in 'ngOnInit'.
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.currentIndex = 0;

    // Stop previous instance if exists
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    this.start();
  }

  // Type next character, until no more characters left:
  private typeCharacter(): void {
    this.el.nativeElement.textContent += this.text[this.currentIndex++];
    if (this.currentIndex > this.text.length - 1) {
      this.stop();
    }
  }

}
