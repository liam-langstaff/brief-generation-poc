import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient;

  constructor() {
    console.log('here');
    this.supabase = new SupabaseClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_ANON_KEY,
    );
  }
}
