import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NewsService} from '../../../shared/service/news.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {

  title: string;
  description: string;
  content: string;
  previewImage: string;

  constructor(private newsService: NewsService,
              private router: Router) {
    this.title = '';
    this.description = '';
    this.content = '';
    this.previewImage = '';
  }

  ngOnInit(): void {
  }

  addNews(): void {
    this.newsService.add({
      title: this.title,
      shortDesc: this.description,
      content: this.content,
      previewImage: this.previewImage
    });
    this.router.navigate(['/admin', 'news']);
  }
}
