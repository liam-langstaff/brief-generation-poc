import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { SupabaseService } from '../../../services/supabase.service';
import { Router } from '@angular/router';
import { AuthUser } from '@supabase/supabase-js';

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
export class AuthComponent {
  passwordVisible: boolean = false;
  signUpMode$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  signUpWithEmail$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private supabaseService: SupabaseService,
    private _router: Router,
  ) {}

  get signInEmailControl(): FormControl {
    return this.signInForm.get('email') as FormControl;
  }

  get signInPasswordControl(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  get signUpEmailControl(): FormControl {
    return this.signUpForm.get('email') as FormControl;
  }

  get signUpPasswordControl(): FormControl {
    return this.signUpForm.get('password') as FormControl;
  }

  get signUpNameControl(): FormControl {
    return this.signUpForm.get('name') as FormControl;
  }

  async signUpNewUser() {
    this.supabaseService
      .signUpNewUserWithEmailAndPassword(
        this.signUpEmailControl.getRawValue(),
        this.signUpPasswordControl.getRawValue(),
        this.signUpNameControl.getRawValue(),
      )
      .then((res) => {
        this.supabaseService.user$.next(res.data.user as AuthUser);
        this._router.navigateByUrl('/generate');
      });
  }

  async signInUser() {
    this.supabaseService
      .signInUserWithEmailAndPassword(
        this.signInEmailControl.getRawValue(),
        this.signInPasswordControl.getRawValue(),
      )
      .then((res) => {
        this.supabaseService.user$.next(res.data.user as AuthUser);
        this._router.navigateByUrl('/generate');
      });
  }

  signUpWithGoogle() {
    this.supabaseService
      .signUpUserWithGoogleProvider()
      .then(() => this._router.navigate(['/generate']));
  }
}
