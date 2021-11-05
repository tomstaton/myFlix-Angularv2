import { Component, OnInit, Input } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {

  @Input() userData = { 
    Username: '', 
    Password: '', 
    Email: '', 
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileEditComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}
    editUserProfile(): void {
      this.fetchApiData.EditUserInfo(this.userData).subscribe((result) => {
        this.dialogRef.close();
        localStorage.setItem('Username', result.Username)
        console.log(result)
        this.snackBar.open(this.userData.Username, 'Successfully updated user details!', {
          duration: 3000
        });
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 3000
        });
        setTimeout(function () {
          window.location.reload();
         }, 3500);
        }
      )
    }}