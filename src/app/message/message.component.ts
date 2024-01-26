import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ErrorService } from '../Service/error.service';
import { GenericService } from '../Service/generic.service';
import axios from 'axios';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements AfterViewInit {
  @ViewChild('message') private messageZone: ElementRef | undefined;
  @Output() showMessage: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeMessage: EventEmitter<void> = new EventEmitter<void>();
  me: number = 0;
  messages: any[] = [];
  error: any = {};
  newMessage: String = '';
  currentMessage: any[] = [];
  isCharge: boolean = false;

  styleMe: string =
    'max-width: 80%; border-radius: 12px; border-top-right-radius: 0px; background-color: var(--secondary); float: right;';
  styleOther: string =
    'max-width: 80%; border-radius: 12px; border-top-left-radius: 0px; background-color: var(--secondary-transparent); float: left;';

  @Input() data: any = {};
  limit: number = 0;
  count: number = 0;

  async ngOnInit() {
    const me = localStorage.getItem('CarsalidPersonne');
    if (me != null) {
      this.me = Number.parseInt(me);
      await this.getAllMessages(this.data.idPersonne);
      this.limit = this.messages.length;
      this.count = 15;
      if (this.limit - this.count >= 0) {
        this.currentMessage = this.messages.slice(
          this.limit - this.count,
          this.limit
        );
      } else {
        this.currentMessage = this.messages.slice(0, this.limit);
      }
      setInterval(async () => {
        await this.getAllMessages(this.data.idPersonne);
        this.limit = this.messages.length;
        if (this.limit - this.count >= 0) {
          this.currentMessage = this.messages.slice(
            this.limit - this.count,
            this.limit
          );
        } else {
          this.currentMessage = this.messages.slice(0, this.limit);
        }
      }, 700);
    }
  }

  showReste() {
    this.isCharge = true;
    setTimeout(() => {
      this.count += 15;
      if (this.limit - this.count >= 0) {
        this.currentMessage = this.messages.slice(
          this.limit - this.count,
          this.limit
        );
      } else {
        this.currentMessage = this.messages.slice(0, this.limit);
      }
      this.isCharge = false;
    }, 2000);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showScroll();
    }, 700);
  }

  showScroll() {
    try {
      if (this.messageZone) {
        this.messageZone.nativeElement.scrollTop =
          this.messageZone.nativeElement.scrollHeight;
      }
    } catch (err) {
      alert(err);
    }
  }

  constructor(
    private ErrorService: ErrorService,
    private genericService: GenericService
  ) {
    this.ErrorService.data$.subscribe((value) => (this.error = value));
  }

  async getAllMessages(idContact: number) {
    try {
      const response = await this.genericService.getAll(
        'messages/entre?idUser=' + this.me + '&&idContact=' + idContact
      );
      this.messages = response.contacts;
    } catch (error) {
      this.error = {
        statut: true,
        message: error,
      };
      this.ErrorService.updateData(this.error);
      return;
    }
  }

  async sendMessage() {
    try {
      const message = {
        dateEnvoye: this.dateNow(),
        sender: {
          idPersonne: this.me,
        },
        receiver: {
          idPersonne: this.data.idPersonne,
        },
        content: this.newMessage,
      };
      var tokken = localStorage.getItem('CarSalTokken');
      var headers = { tokken: tokken };
      const response = await this.genericService.insertWithTokken('messages',message,headers);
      this.messages.push(message);
      this.currentMessage.push(message);
      this.newMessage = '';
      setTimeout(() => {
        this.showScroll();
      }, 500);
    } catch (error) {
      this.error = {
        statut: true,
        message: error,
      };
      this.ErrorService.updateData(this.error);
      return;
    }
  }

  dateNow() {
    var now = new Date();
    var resp = now.getFullYear() + '-';
    if (now.getMonth() + 1 < 10) resp += '0' + (now.getMonth() + 1);
    else resp += now.getMonth() + 1;
    resp += '-';
    if (now.getDate() < 10) resp += '0' + now.getDate();
    else resp += now.getDate();
    resp += 'T';
    if (now.getHours() < 10) resp += '0' + now.getHours();
    else resp += now.getHours();
    resp += ':';
    if (now.getMinutes() < 10) resp += '0' + now.getMinutes();
    else resp += now.getMinutes();
    resp += ':';
    if (now.getSeconds() < 10) resp += '0' + now.getSeconds();
    else resp += now.getSeconds();
    return resp;
  }
}
