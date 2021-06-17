import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PageService} from '../../shared/service/page.service';
import {SectionService} from '../../shared/service/section.service';
import {Page, Section} from '../../shared/interfaces';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.css']
})
export class PageInfoComponent implements OnInit {
  page: Page | undefined;
  section: Section | undefined;

  constructor(private pageService: PageService,
              private sectionService: SectionService,
              private route: ActivatedRoute,
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
    this.pageService.getById(this.route.snapshot.params.id)
      .subscribe(page => {
        this.page = page;
        if (page.sectionId !== undefined) {
          this.sectionService.getById(page.sectionId)
            .subscribe(section => {
              this.section = section;
            });
        }
      });
  }
}
