import { Component } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-my-briefs',
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage],
  templateUrl: './my-briefs.component.html',
  styleUrl: './my-briefs.component.scss',
})
export class MyBriefsComponent {}
