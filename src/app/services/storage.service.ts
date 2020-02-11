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
  wishListCollection: AngularFirestoreCollection<Album>;
  albumDoc: AngularFirestoreDocument<Album>;
  wishList: Observable<Album[]>;
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

    this.wishListCollection = this.afs.collection('wish-list');
    this.wishList = this.wishListCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a=>{
        const data = a.payload.doc.data() as Album;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getAlbums() {
    return this.albums;
  }

  removeFromWishlist(id) {
    this.albumDoc = this.afs.doc(`wish-list/${id}`);
    this.albumDoc.delete();
  }

  storeAlbum(album: Album) {
    this.musicCollection.add(album);
  }

  getWishlist() {
    return this.wishList;
  }

  storeWishlist(album){
    this.wishListCollection.add(album);
  }
}
