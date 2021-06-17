import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {PageService} from '../../../shared/service/page.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  editor = ClassicEditor;
  name: string;
  description: string;
  content: string;
  previewImage: string;

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.name = '';
    this.description = '';
    this.content = '';
    this.previewImage = '';
  }

  ngOnInit(): void {
    const id: number = this.activatedRoute.snapshot.params.id;
    this.pageService.getById(id).subscribe(data => {
      this.name = data.name === undefined ? '' : data.name;
      this.description = data.shortDesc === undefined ? '' : data.shortDesc;
      this.content = data.content === undefined ? '' : data.content;
    });
  }

  updatePage(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.pageService.update(id, {
      name: this.name,
      shortDesc: this.description,
      content: this.content,
    });
    this.router.navigate(['/admin', 'sections']).then(r => {});
  }
}
