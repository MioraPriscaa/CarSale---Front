import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { GenericService } from '../Service/generic.service';
import { ErrorService } from '../Service/error.service';
import { ConnectionService } from '../Service/connection.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css'],
})
export class AnnonceComponent {
  @Output() showMessage: EventEmitter<any> = new EventEmitter<any>();
  isConnected: boolean = false;
  myControl = new FormControl('');
  error: any = {};
  searchText: string = '';

  marque: any[] = [];
  model: any[] = [];
  categorie: any[] = [];
  showFavoris: boolean = false;

  allAnnonce: any[] = [];
  data: any = {};
  allDatas: any = {};
  me: number | undefined;

  constructor(
    private ConnectionService: ConnectionService,
    private genericService: GenericService,
    private ErrorService: ErrorService
  ) {
    this.ErrorService.data$.subscribe((value) => (this.error = value));
    this.ConnectionService.data$.subscribe(
      (value) => (this.isConnected = value.statut)
    );
  }

  async ngOnInit() {
    await this.getAllAnnonce();
    await this.allData();

    const me = localStorage.getItem('CarsalidPersonne');
    if (me != null) {
      this.me = parseInt(me);
    }
  }

  changeModel() {
    this.allDatas.model = this.data.model;
    this.model = [];
    if (this.marque.length != 0) {
      const filteredModels = [];
      for (const model of this.allDatas.model) {
        if (this.marque.includes(model.marque.designation)) {
          filteredModels.push(model);
        }
      }

      this.allDatas.model = filteredModels;
    }
  }

  filtre() {
    if (
      this.marque.length > 0 ||
      this.model.length > 0 ||
      this.categorie.length > 0
    ) {
      this.allAnnonce = (this.data.allAnnonce as any[]).filter((annonce) => {
        return (
          this.marque.includes(annonce.voiture.model.marque.designation) ||
          this.model.includes(annonce.voiture.model.designation) ||
          this.categorie.includes(annonce.voiture.categorie.designation)
        );
      });
    } else {
      this.allAnnonce = this.data.allAnnonce;
    }
  }

  async allData() {
    try {
      this.allDatas.marque = (await this.genericService.getAll(
        'marques'
      )) as any[];
      this.allDatas.model = (await this.genericService.getAll(
        'models'
      )) as any[];
      this.allDatas.categorie = (await this.genericService.getAll(
        'categories'
      )) as any[];
      this.data.marque = this.allDatas.marque;
      this.data.categorie = this.allDatas.categorie;
      this.data.model = this.allDatas.model;
    } catch (error) {
      this.error = {
        statut: true,
        message: error,
      };
      this.ErrorService.updateData(this.error);
      return;
    }
  }

  async getAllAnnonce() {
    try {
      this.allAnnonce = await this.genericService.getAll('annonces/valide');
      this.data.allAnnonce = this.allAnnonce;
    } catch (error) {
      this.error = {
        statut: true,
        message: error,
      };
      this.ErrorService.updateData(this.error);
      return;
    }
  }

  search() {
    this.filtre();
    const lowerText = this.searchText.toLowerCase().trim();
    if (lowerText != '') {
      this.allAnnonce = this.allAnnonce.filter((item) =>
        item.voiture.model.designation.toLowerCase().includes(lowerText)
      );
    }
  }

  async MakeShowFavoris() {
    this.showFavoris = !this.showFavoris;
    if (this.showFavoris) {
      this.allAnnonce = await this.genericService.getAll(
        'annonces/favoris?idUser=' + this.me
      );
    } else {
      this.search();
    }
  }

  MakeShowMessage(data: any) {
    this.showMessage.emit(data);
  }
}
