import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Album } from '../classes/album';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  musicCollection: AngularFirestoreCollection<Album>;
  albums: Observable<Album[]>;

  constructor(public afs: AngularFirestore) {

    this.musicCollection = this.afs.collection('library');
    this.albums = this.musicCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a=>{
        const data = a.payload.doc.data() as Album;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getAlbums() {
    return this.albums;
  }

  storeAlbum(album: Album) {
    this.musicCollection.add(album);
  }
}
