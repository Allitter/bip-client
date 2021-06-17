import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Section} from '../interfaces';
import {ToastService} from './toast.service';
import {SlicePipe} from '@angular/common';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private sectionUrl = `${environment.serverUrl}/sections`;
  public readonly sections$ = new Subject<Section[]>();

  constructor(private http: HttpClient, private toastService: ToastService) {
    this.getAll();
  }

  private fetchSections(): void {
    this.http.get<Section[]>(this.sectionUrl).subscribe(sections => {
      this.sections$.next(sections);
    });
  }

  getAll(): void {
    this.fetchSections();
  }

  add(section: Section): void {
    this.http.post<Section>(this.sectionUrl, section).pipe(
      catchError(this.handleError('add()', []))
    ).subscribe(() => {
      this.fetchSections();
      const slicePipe = new SlicePipe();
      this.toastService
        .show(`Раздел \"${slicePipe.transform(section.title, 0, 10)}\" успешно добавлен`,
          {classname: 'bg-success text-light'});
    });
  }

  remove(id: number): void {
    const url = `${this.sectionUrl}/${id}`;
    this.http.delete<Section>(url).pipe(
      catchError(this.handleError('remove()', []))
    ).subscribe(() => {
      this.fetchSections();
      this.toastService.show(`Раздел успешно удален`, {classname: 'bg-success text-light'});
    });
  }

  getById(id: number): Observable<Section> {
    const url = `${this.sectionUrl}/${id}`;
    return this.http.get<Section>(url).pipe(
      catchError(this.handleError('getById()', []))
    );
  }

  update(id: number, section: Section): void {
    const url = `${this.sectionUrl}/${id}`;
    this.http.put<Section>(url, section).pipe(
      catchError(this.handleError('update()', []))
    ).subscribe(() => {
      this.fetchSections();
      this.toastService.show(`Раздел успешно обновлен`, {classname: 'bg-success text-light'});
    });
  }

  private handleError<T>(operation: string, param2: any[]): any {
    return (error: any): Observable<T> => {
      console.log(`error while ${operation}, message: ${error.message}`);
      // @ts-ignore
      return of(result as T);
    };
  }
}
