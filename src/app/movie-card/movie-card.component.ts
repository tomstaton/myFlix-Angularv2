// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieGenreViewComponent } from '../movie-genre-view/movie-genre-view.component';
import { MovieDirectorViewComponent } from '../movie-director-view/movie-director-view.component';
import { MovieSynopsisViewComponent } from '../movie-synopsis-view/movie-synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

/**
 * run component
 * run getMovies and getUsersFavorites functions
 */
ngOnInit(): void {
  this.getMovies();
  this.getUsersFavorites();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
    this.movies = resp;
    console.log(this.movies);
    return this.movies;
  });
}

getUsersFavorites(): void {
  const user = localStorage.getItem('Username');
  this.fetchApiData.getProfile(user).subscribe((resp: any) => {
    this.favs = resp.FavoriteMovies;
    console.log(this.favs);
    return this.favs;
  });
}

openGenreView(Name:string, Description:string): void {
  this.dialog.open(MovieGenreViewComponent, {
    data: {Name, Description},
    width: '600px'
  } );
}

openDirectorView(Name:string, Bio:string, Birth:number, Death:number): void {
  this.dialog.open(MovieDirectorViewComponent, {
    data: {Name, Bio, Birth, Death},
    width: '600px'
  } );
}

openSynopsisView(Description:string): void {
  this.dialog.open(MovieSynopsisViewComponent, {
    data: {Description},
    width: '600px'
  } );
}

addToUsersFavorites(id:string, Title:string): void {
  this.fetchApiData.addFavMovie(id).subscribe((res: any) => {
    this.snackBar.open(`${Title} has been added to your favorite movies`, 'OK', {
      duration: 2000,
    })
    setTimeout(function() {
      window.location.reload()}, 3000);
  });
  return this.getUsersFavorites();
}

removeFromUsersFavorites(id:string, Title:string): void {
  this.fetchApiData.deleteUserFavMovie(id).subscribe((res: any) => {
    this.snackBar.open(`${Title} has been removed from favorties`, 'OK', {
      duration: 2000,
    })
    setTimeout(function() {
      window.location.reload()}, 3000);
  });
  return this.getUsersFavorites();
}
  
  setFavoriteStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}