import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Grade } from './grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient) { }

  private gradesUrl = 'http://localhost:8080/api/grades'

  getStudentGrades(id: number): Observable<Grade[]> {

    const url = `${this.gradesUrl}/${id}`

    return this.http.get<Grade[]>(url).pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
    );
}

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
