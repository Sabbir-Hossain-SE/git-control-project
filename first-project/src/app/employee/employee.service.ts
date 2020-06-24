import { IEmployee } from './IEmployee';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/Operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}
  baseUrl = 'http://localhost:3000/employees';
  getEmployees(): Observable<IEmployee[]> {
    return this.httpClient
      .get<IEmployee[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side error', errorResponse);
    }
    return throwError('There is a problem with the service');
  }
  getEmployee(id: number): Observable<IEmployee> {
    return this.httpClient
      .get<IEmployee>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.httpClient
      .post<IEmployee>(this.baseUrl, employee, {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  updateEmployee(employee: IEmployee): Observable<void> {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${employee.id}`, employee, {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }
  deleteEmployee(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
