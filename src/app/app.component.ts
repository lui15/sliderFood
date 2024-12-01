import { Component, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  active = 1;
  count = 0;
  items!: NodeListOf<HTMLElement>;
  widthItem = 0;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    const slider = this.elRef.nativeElement.querySelector('.slider');
    const list = this.elRef.nativeElement.querySelector('.list');
    const prev = this.elRef.nativeElement.querySelector('#prev');
    const next = this.elRef.nativeElement.querySelector('#next');
    this.items = this.elRef.nativeElement.querySelectorAll('.list .item');
    this.count = this.items.length;
    this.widthItem = this.items[0].offsetWidth;

    next.addEventListener('click', () => {
      this.active = Math.min(this.active + 1, this.count - 1);
      this.runCarousel(list, prev, next);
    });

    prev.addEventListener('click', () => {
      this.active = Math.max(this.active - 1, 0);
      this.runCarousel(list, prev, next);
    });

    this.runCarousel(list, prev, next);
  }

  runCarousel(list: HTMLElement, prev: HTMLElement, next: HTMLElement) {
    prev.style.display = this.active === 0 ? 'none' : 'block';
    next.style.display = this.active === this.count - 1 ? 'none' : 'block';

    const oldActive = this.elRef.nativeElement.querySelector('.item.active');
    oldActive?.classList.remove('active');
    this.items[this.active].classList.add('active');

    const leftTransform = this.widthItem * (this.active - 1) * -1;
    list.style.transform = `translateX(${leftTransform}px)`;
  }
}
