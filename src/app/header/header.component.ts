import { Component, HostListener } from '@angular/core';
import { ErrorService } from '../Service/error.service';
import { ConnectionService } from '../Service/connection.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  divStyle =
    'top: 0; width: 100%; background: linear-gradient( to bottom, var(--primary-transparent),transparent);';

  isConnected: boolean = false;
  error: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ErrorService: ErrorService,
    private ConnectionService: ConnectionService
  ) {
    this.ErrorService.data$.subscribe((value) => (this.error = value));
    this.ConnectionService.data$.subscribe(
      (value) => (this.isConnected = value.statut)
    );
  }

  animationFrameId: number | null = null;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(() => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition == 0) {
        this.divStyle =
          'top: 0; width: 100%; background: linear-gradient( to bottom, var(--primary-transparent),transparent);';
      } else {
        this.divStyle =
          'top: 0; width: 100%; background: var(--primary); z-index: 100';
      }
    });
  }
  logout() {
    localStorage.removeItem('CarSalTokken');
    localStorage.removeItem('CarsalidPersonne');
    const value = {
      statut: false,
    };
    this.ConnectionService.updateData(value);
  }
}
