import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { FormBuilder } from '@angular/forms';
import { Album } from '../../classes/album';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm;
  results;
  album: Album = {
    title: '',
    format: '',
    cover_image: ''
  };

  constructor(private api: ApiService, private fb: FormBuilder, private storage: StorageService) { }

  onSubmit() {
    this.api.searchMusic(this.searchForm.value.artist, this.searchForm.value.album)
      .subscribe(data => this.results = data);
    console.log(this.results);
  }
  addAlbum(id) {
    this.album.title = this.results.results[id].title;
    this.album.format = this.results.results[id].format;
    this.album.cover_image = this.results.results[id].cover_image;

    this.storage.storeAlbum(this.album);

    console.log(this.results.results[id]);
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      artist: [''],
      album: ['']
    });
  }

}
