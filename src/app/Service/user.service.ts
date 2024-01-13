import { Injectable } from '@angular/core';
import axios from 'axios';
import { url } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  async insertUser(data: any) {
    try {
      const response = await axios.post(`${url}/personnes`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login(mail: any, motDePasse: string) {
    const formData = new FormData();
    formData.append('mail', mail);
    formData.append('motDePass', motDePasse);
    try {
      const response = await axios.post(`${url}/personnes/login`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
