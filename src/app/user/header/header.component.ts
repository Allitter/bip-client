import {Component, OnInit} from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {News} from '../../shared/interfaces';
import {NewsService} from '../../shared/service/news.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  news: News[] = [];
  newsItemTitle = '';
  // todo refactor
  newsSearch: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? [] : this.news.map(newsItem => newsItem.title)
        .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)))

  constructor(private newsService: NewsService,
              private router: Router) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.loadContent();
      }
    });
  }

  ngOnInit(): void {
    this.loadContent();
  }

  private loadContent(): void {
    this.newsService.news$.subscribe(news => this.news = news);
    this.newsService.getAll();
  }

  searchNews(e: Event): void {
    e.preventDefault();
    this.router.navigate(['/news'], {state: {newsSearchWord: this.newsItemTitle}}).then(r => {});
  }
}
