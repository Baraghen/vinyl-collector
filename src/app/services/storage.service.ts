import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
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

  constructor(public afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.musicCollection = this.afs.collection(`users/${this.afAuth.auth.currentUser.uid}/library`, ref => {
      return ref.orderBy('title');
    });
    this.albums = this.musicCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a=>{
        const data = a.payload.doc.data() as Album;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    this.wishListCollection = this.afs.collection(`users/${this.afAuth.auth.currentUser.uid}/wish-list`, ref => {
      return ref.orderBy('title');
    });
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

  removeFromWishList(id) {
    this.albumDoc = this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}/wish-list/${id}`);
    this.albumDoc.delete();
  }

  removeFromLibrary(id) {
    this.albumDoc = this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}/library/${id}`);
    this.albumDoc.delete();
  }

  storeAlbum(album: Album) {
    this.musicCollection.add(album);
  }

  getWishList() {
    return this.wishList;
  }

  storeWishList(album) {
    this.wishListCollection.add(album);
  }
}
