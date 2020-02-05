import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

URL = '';

  constructor(private http: HttpClient) { }

  getMusic() {

  }
}
