import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  @Output() showMessage: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeMessage: EventEmitter<void> = new EventEmitter<void>();
}
