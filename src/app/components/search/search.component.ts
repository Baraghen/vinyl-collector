import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm;
  results;

  constructor(private api: ApiService, private fb: FormBuilder) { }

  onSubmit() {
    this.api.searchMusic(this.searchForm.value.artist, this.searchForm.value.album)
      .subscribe(data => this.results = data);
    console.log(this.results);
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      artist: [''],
      album: ['']
    });
  }

}
