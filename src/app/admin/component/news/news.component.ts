import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {News} from '../../../shared/interfaces';
import {NewsService} from '../../../shared/service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public news: News[];
  page = 1;
  pageSize = 9;

  constructor(private newsService: NewsService,
              private router: Router,
              private modalService: NgbModal) {
    this.news = [];
  }

  ngOnInit(): void {
    this.newsService.news$.subscribe(news => this.news = news);
    this.newsService.getAll();
  }

  editNews(id: any): void {
    this.router.navigate([`/admin/edit/news/${+id}`]);
  }

  openModal(content: any, id: number | undefined): any {
    this.modalService.open(content, {backdrop: 'static', size: 'md'})
      .closed.subscribe(() => this.removeNews(id));
  }

  removeNews(id: any): void {
    this.newsService.remove(id);
  }
}
