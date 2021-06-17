import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {ToastService} from './toast.service';
import {News} from '../interfaces';
import {environment} from '../../../environments/environment';

@Injectable()
export class NewsService {
  private newsUrl = `${environment.serverUrl}/news`;
  public readonly news$ = new Subject<News[]>();

  constructor(private http: HttpClient,
              private toastService: ToastService) {
    this.getAll();
  }

  getAll(): void {
    this.fetchNews();
  }

  private fetchNews(): void {
    this.http.get<News[]>(this.newsUrl).subscribe(news => {
      this.news$.next(news);
    });
  }

  add(news: News): void {
    console.log(news);
    this.http.post<News>(this.newsUrl, news).subscribe((data) => {
      this.toastService.show('Новость успешно добавлена', {classname: 'bg-success text-light'});
      this.fetchNews();
    });
  }

  remove(id: number): void {
    const url = `${this.newsUrl}/${id}`;
    this.http.delete<News>(url).subscribe((data) => {
      this.toastService.show('Новость успешно удалена', {classname: 'bg-success text-light'});
      this.fetchNews();
    });
  }

  getById(id: number): Observable<News> {
    const url = `${this.newsUrl}/${id}`;
    return this.http.get<News>(url);
  }

  update(id: number, news: News): void {
    const url = `${this.newsUrl}/${id}`;
    this.http.put<News>(url, news).subscribe((data) => {
      this.toastService.show('Новость успешно обновлена', {classname: 'bg-success text-light'});
      this.fetchNews();
    });
  }

  private handleError<T>(operation: string, param2: any[]): any {
    return (error: any): Observable<T> => {
      console.log(`error while ${operation}, error message: ${error.message}`);
      // @ts-ignore
      return of(result as T);
    };
  }
}
