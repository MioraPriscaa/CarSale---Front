import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  @Output() showMessage: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeMessage: EventEmitter<void> = new EventEmitter<void>();
  me: number = 0;

  styleMe: string =
    'max-width: 80%; border-radius: 12px; border-top-right-radius: 0px; background-color: var(--secondary); float: right;';
  styleOther: string =
    'max-width: 80%; border-radius: 12px; border-top-left-radius: 0px; background-color: var(--secondary-transparent); float: left;';

  @Input() data: any[] = [];

  ngOnInit() {
    const data = localStorage.getItem('CarsalidPersonne');
    if (data != null) {
      this.me = Number.parseInt(data);
    }
  }
}
