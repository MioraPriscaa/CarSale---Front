import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  divStyle =
    'top: 0; width: 100%; background: linear-gradient( to bottom, var(--primary-transparent),transparent);';

  isConnected: boolean = false;

  animationFrameId: number | null = null;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(() => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const parallaxFactor = 0.5;
      if (scrollPosition == 0) {
        this.divStyle =
          'top: 0; width: 100%; background: linear-gradient( to bottom, var(--primary-transparent),transparent);';
      } else {
        this.divStyle =
          'top: 0; width: 100%; background: var(--primary); z-index: 100';
      }
      const bodyElement = document.getElementById('head');
      if (bodyElement) {
        const newPosition = `center ${-scrollPosition * parallaxFactor}px`;
        bodyElement.style.backgroundPosition = newPosition;
      }
    });
  }
}
