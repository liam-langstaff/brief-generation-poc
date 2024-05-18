import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    NgIf,
    AsyncPipe,
    MatFormFieldModule,
    MatIcon,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class AuthComponent implements AfterViewInit {
  passwordVisible: boolean = false;
  signUpMode$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  signUpWithEmail$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.email]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  signInForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private cd: ChangeDetectorRef) {}

  get signInEmailControl(): FormControl {
    return this.signInForm.get('email') as FormControl;
  }

  get signInPasswordControl(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  get signInNameControl(): FormControl {
    return this.signInForm.get('name') as FormControl;
  }

  get signUpEmailControl(): FormControl {
    return this.signInForm.get('email') as FormControl;
  }

  get signUpPasswordControl(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  get signUpNameControl(): FormControl {
    return this.signInForm.get('name') as FormControl;
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnInit() {
    this.signUpForm.valueChanges.subscribe((value) => {
      console.log(this.signUpForm);
    });
    this.signInForm.valueChanges.subscribe((value) =>
      console.log(this.signInForm),
    );
  }
}
