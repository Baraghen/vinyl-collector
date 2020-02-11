import { Component, OnInit } from '@angular/core';
import { Album } from '../../classes/album';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  wishList: Album[];
  album: Album = {
    title: '',
    format: '',
    cover_image: ''
  };
  constructor(private db: StorageService) { }

  addToLibrary(i, id) {
    this.album.title = this.wishList[i].title;
    this.album.format = this.wishList[i].format;
    this.album.cover_image = this.wishList[i].cover_image;

    this.db.storeAlbum(this.album);
    this.removeFromWishList(id);
  }

  removeFromWishList(id) {
    let albumRef = document.getElementById(id);
    this.db.removeFromWishlist(id);
    albumRef.remove();
  }

  ngOnInit() {
    this.db.getWishlist().subscribe(albums => {
      this.wishList = albums;
    });
  }

}
