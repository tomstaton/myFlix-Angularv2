import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileViewComponent } from '../user-profile-view/user-profile-view.component';

const username = localStorage.getItem('username')

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar, 
    ) { }

  ngOnInit(): void {
  }

public openProfileView(): void {
    this.dialog.open(UserProfileViewComponent, {
      width: '800px'
    } );
  }

openMovies(): void {
  this.router.navigate(['movies']);
}

openFavorites(): void {
  this.router.navigate(['favorites'])
}

logOut(): void {
  this.router.navigate(['welcome']);
  this.snackBar.open('Logout successful!', 'OK', {
    duration: 3000
    });
  }
}
