import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {News} from '../../shared/interfaces';
import {NewsService} from '../../shared/service/news.service';

@Component({
  selector: 'app-news-info',
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.css']
})
export class NewsInfoComponent implements OnInit {
  newsItem: News | undefined;

  constructor(private newsService: NewsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadNewsItem();
  }

  private loadNewsItem(): void {
    this.newsService.getById(this.route.snapshot.params.id)
      .subscribe(newsItem => {
        this.newsItem = newsItem;
        console.log(newsItem);
      });
  }
}
