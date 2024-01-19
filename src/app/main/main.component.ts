import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  isShowMessage: boolean = false;

  showMessage(data: any) {
    this.isShowMessage = true;
  }

  closeMessage() {
    this.isShowMessage = false;
  }
}
