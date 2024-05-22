import { Injectable } from '@angular/core';
import { AuthUser, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient = {} as SupabaseClient;
  isAuthenticated$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  user$: BehaviorSubject<AuthUser | boolean | null> = new BehaviorSubject<
    AuthUser | boolean | null
  >(null);

  constructor(private _router: Router) {}

  setupSupabase() {
    console.log((window as any).process.env.SUPABASE_URL);
    this.supabase = new SupabaseClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_ANON_KEY,
    );

    this.checkIfAlreadyAuthenticated();
    this.listenToSupabaseEvents();
  }

  signUpUserWithGoogleProvider() {
    return this.supabase.auth
      .signInWithOAuth({ provider: 'google' })
      .then((user) => {
        this._router.navigateByUrl('/generate');
      });
  }

  signInUserWithEmailAndPassword(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  signUpNewUserWithEmailAndPassword(
    email: string,
    password: string,
    name: string,
  ) {
    return this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
  }

  async isAuthenticated() {
    const user = await this.supabase.auth.getUser();

    if (!!user.data.user) {
      this.isAuthenticated$.next(true);
      this.user$.next(user.data.user);
    } else {
      this.isAuthenticated$.next(false);
    }
  }

  checkIfAlreadyAuthenticated() {
    const user = this.supabase.auth.getUser();
    if (!!user) {
      this.isAuthenticated$.next(true);
    } else {
      this.isAuthenticated$.next(false);
    }
  }

  signOutUser() {
    this.supabase.auth.signOut().then(() => {
      localStorage.clear();
      this._router.navigateByUrl('/');
    });
  }

  private async listenToSupabaseEvents() {
    this.supabase.auth.onAuthStateChange(async (event, session) => {
      console.log({ event, session });
      if (event === 'SIGNED_IN') {
        if (session && session.user) {
          this.user$.next(session.user);
        }
      } else if (event === 'SIGNED_OUT') {
        await this.isAuthenticated();
        this.user$.next(false);
      }
    });
  }
}
