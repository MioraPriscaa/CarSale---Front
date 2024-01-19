import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConnectionService } from '../Service/connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css'],
})
export class OneComponent {
  @Output() showMessage: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any = {};

  isFavorite: boolean = false;
  iconEtat: string = 'regular';
  isShow: boolean = false;
  class: string = 'card one';
  isShowDetail: boolean = false;
  showDetail: string = 'voirDetail VoirInactive';
  isConnected: boolean = false;

  constructor(
    private ConnectionService: ConnectionService,
    private router: Router
  ) {
    this.ConnectionService.data$.subscribe(
      (value) => (this.isConnected = value.statut)
    );
  }

  ngOnInit() {
  }

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

  showMessages(data: any) {
    if (!this.isConnected) {
      this.router.navigateByUrl('/login/false');
    } else {
      this.showMessage.emit(data);
    }
  }
}
