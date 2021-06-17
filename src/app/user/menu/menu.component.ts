import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SectionService} from '../../shared/service/section.service';
import {Section} from '../../shared/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  sections: Section[] = [];
  showSectionContent: boolean[] = [];

  constructor(private sectionService: SectionService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.sectionService.sections$
      .subscribe(sections => {
        this.sections = sections.filter(s => s.title !== 'default' && s?.pages?.length > 0);
        this.showSectionContent = new Array(this.sections.length).fill(false);
      });
    this.sectionService.getAll();
  }

  toggleSection(index: number, value: boolean | null): void {
    this.showSectionContent.fill(false);
    this.showSectionContent[index] = value === null ? !this.showSectionContent[index] : value;
  }

  navigateToPage(id: number): void {
    this.router.navigate(['/pages', id]).then(() => {
      });
  }
}
