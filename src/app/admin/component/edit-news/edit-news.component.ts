import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../../shared/service/news.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
  editor = ClassicEditor;
  title: string;
  description: string;
  content: string;
  previewImage: string;

  constructor(private newsService: NewsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.title = '';
    this.description = '';
    this.content = '';
    this.previewImage = '';
  }

  ngOnInit(): void {
    const id: number = this.activatedRoute.snapshot.params.id;
    this.newsService.getById(id).subscribe(data => {
      this.title = data.title;
      this.description = data.shortDesc;
      this.content = data.content;
      this.previewImage = data.previewImage;
    });
  }

  updateNews(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.newsService.update(id, {
      title: this.title,
      shortDesc: this.description,
      content: this.content,
      previewImage: this.previewImage
    });
    this.router.navigate(['/admin', 'news']);
  }
}
