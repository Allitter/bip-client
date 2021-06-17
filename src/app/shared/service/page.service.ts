import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Page} from '../interfaces';
import {SectionService} from './section.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private pageUrl = `${environment.serverUrl}/pages`;

  constructor(private http: HttpClient,
              private sectionService: SectionService) {
  }

  getAll(): Observable<Page[]> {
    return this.http.get<Page[]>(this.pageUrl).pipe(
      catchError(this.handleError('getAll()', []))
    );
  }

  add(page: Page): void {
    this.http.post<Page>(this.pageUrl, page).pipe(
      catchError(this.handleError('add()', []))
    ).subscribe(() => this.sectionService.getAll());
  }

  remove(id: number): void {
    const url = `${this.pageUrl}/${id}`;
    this.http.delete<Page>(url).pipe(
      catchError(this.handleError('remove()', []))
    ).subscribe(() => this.sectionService.getAll());
  }

  getById(id: number): Observable<Page> {
    const url = `${this.pageUrl}/${id}`;
    return this.http.get<Page>(url).pipe(
      catchError(this.handleError('getById()', []))
    );
  }

  movePage(pageId: number, sectionId: number): void {
    this.update(pageId, {sectionId});
  }

  update(id: number, page: Page): void {
    const url = `${this.pageUrl}/${id}`;
    this.http.put<Page>(url, page).pipe(
      catchError(this.handleError('update()', []))
    ).subscribe(() => this.sectionService.getAll());
  }

  private handleError<T>(operation: string, param2: any[]): any {
    return (error: any): Observable<T> => {
      console.log(`error while ${operation}, message: ${error.message}`);
      // @ts-ignore
      return of(result as T);
    };
  }
}
