import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

URL = 'https://api.discogs.com/database/search';
key = 'qMWBWINiHNgXlsPjEwjn';
secret = 'VfAaFtskCtyzPKkdHKoQrAeoqLRBErea';


  constructor(private http: HttpClient) { }

  searchMusic(artist, title) {
    let headers = new HttpHeaders()
      .set('Authorization', `Discogs key=${this.key}, secret=${this.secret}`);
    let params = new HttpParams()
      .set('type', 'master',)
      .set('format', 'album')
      .set('artist', artist)
      .set('title', title);

    return this.http.get(this.URL, {params, headers});
  }
}
