import { Component } from '@angular/core';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css'],
})
export class OneComponent {
  isFavorite: boolean = false;
  iconEtat: string = 'regular';
  isShow: boolean = false;
  class: string = 'card one';
  isShowDetail: boolean = false;
  showDetail: string = 'voirDetail VoirInactive';

  ngOnInit() {}

  changeState() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.iconEtat = 'solid';
    } else {
      this.iconEtat = 'regular';
    }
  }

  makeShow() {
    this.isShow = !this.isShow;
    if (this.isShow) {
      this.class = 'card one one_active';
    } else {
      this.class = 'card one';
    }
  }

  makeShowDetail() {
    this.isShowDetail = !this.isShowDetail;
    if (!this.isShowDetail) {
      this.showDetail = 'voirDetail VoirInactive';
    } else {
      this.showDetail = 'voirDetail';
    }
  }
}
