import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { GenericService } from '../Service/generic.service';
import { ErrorService } from '../Service/error.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css'],
})
export class AnnonceComponent {
  isConnected: boolean = true;
  myControl = new FormControl('');
  error: any = {};
  searchText: string = '';

  marque: any[] = [];
  model: any[] = [];

  allAnnonce: any[] = [];
  data: any = {};
  allDatas: any = {};

  constructor(
    private genericService: GenericService,
    private ErrorService: ErrorService
  ) {
    this.ErrorService.data$.subscribe((value) => (this.error = value));
  }

  async ngOnInit() {
    await this.getAllAnnonce();
    await this.allData();
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

  filtre() {}

  async allData() {
    try {
      this.allDatas.marque = (await this.genericService.getAll(
        'marques'
      )) as any[];
      this.allDatas.model = (await this.genericService.getAll(
        'models'
      )) as any[];
      this.data.model = this.allDatas.model;
      this.data.marque = this.allDatas.marque;
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
      this.allAnnonce = await this.genericService.getAll('annonces');
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
    const lowerText = this.searchText.toLowerCase().trim();
    if (lowerText != '') {
      this.allAnnonce = this.allAnnonce.filter((item) =>
        item.voiture.model.designation.toLowerCase().includes(lowerText)
      );
    } else {
      this.allAnnonce = this.data.allAnnonce;
    }
  }
}
