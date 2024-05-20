import { Component } from '@angular/core';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  constructor(private supabaseService: SupabaseService) {}
}
