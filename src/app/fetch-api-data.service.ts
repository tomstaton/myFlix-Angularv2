import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://internetbasedmoviedata.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
 constructor(private http: HttpClient) { }
// Making the api call for the user registration endpoint
public userRegistration(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'users', userDetails).pipe(
  catchError(this.handleError)
  );
}

public loginUser(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

getProfile(username: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    }
  ) }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  )
}

getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

getDirector(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/director/:Name', {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

getGenre(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/genre/:Name', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

addFavMovie(id: string): Observable<any> {
  const user = localStorage.getItem('Username');
  const token = localStorage.getItem('token');
  return this.http.post(apiUrl + 'users/' + user + '/movies/' + id, id, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
  );
}


deleteUserFavMovie(id: string): Observable<any> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('Username');
  return this.http.delete(apiUrl + 'users/' + user + '/movies/' + id, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

EditUserInfo(userDetails: any): Observable<any> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('Username');
  console.log(userDetails);
  return this.http.put(apiUrl + `users/${user}`, userDetails,  {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

deleteUser(Username: string): Observable<any> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('Username');
  return this.http.delete(apiUrl + `users/${user}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

private extractResponseData(res: Response | Object): any { const body = res;
    return body || { };
  }

private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
  console.error('Some error occurred:', error.error.message);
  } else {
  console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
  }
  return throwError(
  'Something bad happened; please try again later.');
  }
}
