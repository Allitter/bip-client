import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Document} from '../interfaces';
import {environment} from '../../../environments/environment';

@Injectable()
export class DocumentService {
  private documentUrl = `${environment.serverUrl}/files`;

  constructor(private http: HttpClient) {
  }

  getAll(name: string | null): Observable<Document[]> {
    let url = this.documentUrl;
    if (name != null) {
      url = url + `?name=${name}`;
    }
    return this.http.get<Document[]>(url).pipe(
      catchError(this.handleError('getAll()', []))
    );
  }

  remove(id: number): Observable<Document> {
    const url = `${this.documentUrl}/${id}`;
    return this.http.delete<Document>(url).pipe(
      catchError(this.handleError('remove()', []))
    );
  }

  getById(id: number): Observable<Document> {
    const url = `${this.documentUrl}/${id}`;
    return this.http.get<Document>(url).pipe(
      catchError(this.handleError('getById()', []))
    );
  }

  update(id: number, file: Document): Observable<Document> {
    const url = `${this.documentUrl}/${id}`;
    return this.http.put<Document>(url, file).pipe(
      catchError(this.handleError('update()', []))
    );
  }

  private handleError<T>(operation: string, param2: any[]): any {
    return (error: any): Observable<T> => {
      console.log(`error while ${operation}, message: ${error.message}`);
      // @ts-ignore
      return of(result as T);
    };
  }
}
