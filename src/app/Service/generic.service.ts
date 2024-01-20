import { Injectable } from '@angular/core';
import axios from 'axios';
import { url } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor() {}

  async getAll(path: string) {
    try {
      const response = await axios.get(`${url}/${path}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async insert(path: string, data: any) {
    try {
      const response = await axios.post(`${url}/${path}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  async insertWithTokken(path: string, data: any, headers: any) {
    try {
      const response = await axios.post(`${url}/${path}`, data, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }



  async modifier(path: string, data: any) {
    try {
      const response = await axios.put(`${url}/${path}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(path: string, id: number) {
    try {
      const response = await axios.delete(`${url}/${path}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
