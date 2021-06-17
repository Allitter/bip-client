import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {PageService} from '../../../shared/service/page.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  editor = ClassicEditor;
  name: string;
  description: string;
  content: string;
  previewImage: string;
  idSection: number;

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.name = '';
    this.description = '';
    this.content = '';
    this.previewImage = '';
    this.idSection = this.router.getCurrentNavigation()?.extras?.state?.sectionId;
  }

  ngOnInit(): void {
  }

  createPage(): void {
    this.pageService.add({
      name: this.name,
      shortDesc: this.description,
      content: this.content,
      sectionId: this.idSection
    });

    this.router.navigate(['/admin', 'sections']);
  }
}
