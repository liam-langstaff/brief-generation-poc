import { AfterViewInit, Component } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-briefs',
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage, RouterLink],
  templateUrl: './my-briefs.component.html',
  styleUrl: './my-briefs.component.scss',
})
export class MyBriefsComponent implements AfterViewInit {
  ngAfterViewInit() {
    document.querySelectorAll('.library-card__image').forEach((item) => {
      if (item instanceof HTMLElement) {
        item.style.backgroundColor = this.getRandomColor();
      }
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
