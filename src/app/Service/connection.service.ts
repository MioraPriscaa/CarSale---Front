import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private dataSubject = new BehaviorSubject<any>({
    statut: false,
  });
  data$ = this.dataSubject.asObservable();

  updateData(newValue: any) {
    this.dataSubject.next(newValue);
  }

  constructor() {
    const tokken = localStorage.getItem('CarSalTokken');
    if (tokken != null) {
      this.dataSubject.next({ statut: true });
    }
  }
}
