import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ConnectionService } from '../Service/connection.service';
import { Router } from '@angular/router';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { GenericService } from '../Service/generic.service';

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
  me: number = 0;
  favoriseurs :number = 0;

  constructor(
    private ConnectionService: ConnectionService,
    private router: Router,
    private genericService: GenericService
  ) {
    this.ConnectionService.data$.subscribe(
      (value) => (this.isConnected = value.statut)
    );
  }

  ngOnInit() {
    const me = localStorage.getItem('CarsalidPersonne');
    if (me != null) {
      this.me = Number.parseInt(me);
      this.data.favoriseur.map((user:number)=>{
        if(this.me == user) {
          this.iconEtat = 'solid';
          this.isFavorite = true;
        }
      });
      this.favoriseurs = this.data.favoriseur.length;
    }
  }

  async changeState(annonce:any) {
    const idUser = localStorage.getItem("CarsalidPersonne");
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.genericService.modifier('annonces/favoriser?idAnnonce='+ annonce.id +'&idUser=' + idUser,null);
      this.iconEtat = 'solid';
      this.favoriseurs = this.favoriseurs + 1 ;
    } else {
      this.genericService.modifier('annonces/defavoriser?idAnnonce='+ annonce.id +'&idUser=' + idUser,null);
      this.iconEtat = 'regular';
      this.favoriseurs = this.favoriseurs - 1 ;
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

  images = [62, 83, 466, 965, 982, 1043, 738].map(
    (n) => `https://picsum.photos/id/${n}/900/500`
  );

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | undefined;

  togglePaused() {
    if (this.carousel) {
      if (this.paused) {
        this.carousel.cycle();
      } else {
        this.carousel.pause();
      }
      this.paused = !this.paused;
    }
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
}
