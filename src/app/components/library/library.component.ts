import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Album } from '../../classes/album';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  library: Album[];

  constructor(private db: StorageService) { }

  ngOnInit() {
    this.db.getAlbums().subscribe(albums => {
      this.library = albums;
    });
  }

}
