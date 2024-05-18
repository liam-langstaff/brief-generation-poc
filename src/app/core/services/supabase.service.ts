import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient = {} as SupabaseClient;

  constructor() {}

  setupSupabase() {
    this.supabase = new SupabaseClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_ANON_KEY,
    );
    console.log('Client initialized');
  }

  googleLogin() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `https://eamejbzsjhqyuakkxrxq.supabase.co/auth/v1/callback`,
        queryParams: { access_type: 'offline', prompt: 'consent', }
      }
    }).then((login) => this.supabase.auth.getSession().then(res => console.log(res.data)));
  }

  async getAuthsession() {
    return await this.supabase.auth.getUser();
  }
}
