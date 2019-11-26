import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalThingsService {
  baseurl =  'https://powerful-brushlands-67246.herokuapp.com/api';
  
  // Base url

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  // POST
  CreateModel(model,data): Observable<any[]> {
    return this.http.post<any[]>(this.baseurl + '/' + model + '/', data, this.httpOptions)
  }  

  // GET
  GetIdModel(model,id): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + '/' + model + '/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetAllModel(model): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + '/' + model + '/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateModel(model, id, data): Observable<any[]> {
    return this.http.put<any[]>(this.baseurl + '/' + model + '/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // DELETE
  DeleteModel(model,id){
    return this.http.delete<any[]>(this.baseurl + '/' + model + '/' + id, this.httpOptions)
  }

  // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

}
