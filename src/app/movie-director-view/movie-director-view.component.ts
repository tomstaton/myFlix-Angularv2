import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director-view',
  templateUrl: './movie-director-view.component.html',
  styleUrls: ['./movie-director-view.component.scss']
})
export class MovieDirectorViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
        Name: string,
        Bio: string,
        Birth: number,
        Death: number}
   ) { }

  ngOnInit(): void {
  }

}
