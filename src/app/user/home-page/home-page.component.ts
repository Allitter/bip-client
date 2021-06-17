import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NewsService} from '../../shared/service/news.service';
import {News} from '../../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  showFacultyInfo1 = false;
  showFacultyInfo2 = false;
  showFacultyInfo3 = false;
  showFacultyInfo4 = false;
  news: News[] = [];

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
}
