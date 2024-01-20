import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { ErrorService } from '../Service/error.service';
import { ConnectionService } from '../Service/connection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from './../Service/generic.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() showMessage: EventEmitter<any> = new EventEmitter<any>();
  divStyle =
    'top: 0; width: 100%; background: linear-gradient( to bottom, var(--primary-transparent),transparent);';

  isConnected: boolean = false;
  error: any = {};
  data:any[] = [];
  contacts:any[] = [];
  newMessage = 0;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ErrorService: ErrorService,
    private ConnectionService: ConnectionService,
    private genericService: GenericService
  ) {
    this.ErrorService.data$.subscribe((value) => (this.error = value));
    this.ConnectionService.data$.subscribe(
      (value) => (this.isConnected = value.statut)
    );
  }
  
  async ngOnInit() {
  }
  
  async getAllContact(){
    const idUser = localStorage.getItem("CarsalidPersonne");
    try {
      const response = await this.genericService.getAll('messages/contacts?idUser=' + idUser);
      this.data = response.contacts;
      this.newMessage = 0;
      this.contacts = [];
      this.data.map((element)=>{
        var personne:any = {};
        var lastMessage = {};
        if(element.sender.idPersonne == idUser) {
          personne = element.receiver;
          lastMessage = 'Vous: ' + element.content;
          element.etat = 10;
        }else{
          personne = element.sender;
          lastMessage = element.sender.prenom + ': ' + element.content;
        }
        if(element.etat == 0)this.newMessage += 1;
        this.contacts.push({
          personne:personne,
          lastMessage:lastMessage,
          etat:element.etat
        });
      });
    } catch (error) {
      this.error = {
        statut: true,
        message: error,
      };
      this.ErrorService.updateData(this.error);
      return;
    }
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
  
  async refresh(){
    await this.getAllContact();
  }
  
  showMessages(data: any) {
    if (!this.isConnected) {
      this.router.navigateByUrl('/login/false');
    } else {
      this.showMessage.emit(data);
    }
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
