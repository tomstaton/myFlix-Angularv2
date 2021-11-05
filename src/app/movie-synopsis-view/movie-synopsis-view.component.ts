import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis-view',
  templateUrl: './movie-synopsis-view.component.html',
  styleUrls: ['./movie-synopsis-view.component.scss']
})
export class MovieSynopsisViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
        Description: string}
  ) { }

  ngOnInit(): void {
  }

}
