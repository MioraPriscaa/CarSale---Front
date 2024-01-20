import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  isShowMessage: boolean = false;
  message: any[] = [];

  showMessage(data: any) {
    this.isShowMessage = false;
    setTimeout(() => {
      this.isShowMessage = true;
      this.message = data;
    }, 200);
  }

  closeMessage() {
    this.isShowMessage = false;
  }
}
