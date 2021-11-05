import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';


@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss']
})
export class UserProfileViewComponent implements OnInit {

  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

getProfile(): void {
  let user = localStorage.getItem('Username');
  this.fetchApiData.getProfile(user).subscribe((res: any) => {
    this.user = res;
    })
  }
openEditProfileDialog(): void{
  this.dialog.open(UserProfileEditComponent, {
    width: '500px'
    })
  }
}
