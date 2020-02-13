import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { FormBuilder } from '@angular/forms';
import { Album } from '../../classes/album';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  library: Album[];
  filteredLibrary: Album[];
  filterForm;

  constructor(private db: StorageService, private fb: FormBuilder) { }

  filterMusic() {
    if(this.filterForm.value.filter === '') {
      this.filteredLibrary = null;
    } else {
      this.filteredLibrary = this.library.filter(o => o.title.toLowerCase().includes(this.filterForm.value.filter.toLowerCase()));
      if(this.filteredLibrary == []) {
        this.filteredLibrary = null;
      }
    }
    this.filterForm.reset();
  }

  clearFilter() {
    this.filteredLibrary = null;
  }

  removeFromLibrary(id) {
    let albumRef = document.getElementById(id);
    this.db.removeFromLibrary(id);
    albumRef.remove();
  }

  ngOnInit() {
    this.db.getAlbums().subscribe(albums => {
      this.library = albums;
    });

    this.filterForm = this.fb.group({
      filter: ['']
    })
  }

}
