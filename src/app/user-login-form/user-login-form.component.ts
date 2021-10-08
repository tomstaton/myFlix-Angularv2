
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData= { Username: '', Password: '' }

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router )
    { }


ngOnInit(): void {
}

loginUser(): void {
    this.fetchApiData.loginUser(this.userData).subscribe((response) => {
    localStorage.setItem('username', response.user.username);
    localStorage.setItem('token', response.token);
    this.dialogRef.close();
    this.snackBar.open(response, 'OK', {
      duration: 2000
    });
    this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
