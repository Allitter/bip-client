import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NewsService} from '../../shared/service/news.service';
import {News} from '../../shared/interfaces';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {
  news: News[] = [];
  filteredNews: News[] = [];
  page = 1;
  pageSize = 10;
  newsItemTitle = '';

  constructor(private newsService: NewsService,
              private router: Router) {
    this.newsItemTitle = this.router.getCurrentNavigation()?.extras?.state?.newsSearchWord;

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
    this.newsService.news$.subscribe(news => {
      this.news = news;
      this.filterNews();
    });
    this.newsService.getAll();
  }

  filterNews(): void {
    this.filteredNews = this.newsItemTitle === '' || this.newsItemTitle === null || this.newsItemTitle === undefined
      ? this.news
      : this.news.filter(v => {
        const titleContains = v.title.toLowerCase().indexOf(this.newsItemTitle.toLowerCase()) > -1;
        const contentContains = v.content.toLowerCase().indexOf(this.newsItemTitle.toLowerCase()) > -1;
        return titleContains || contentContains;
      });
  }
}
