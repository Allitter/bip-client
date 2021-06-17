import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Section} from '../../../shared/interfaces';
import {PageService} from '../../../shared/service/page.service';
import {SectionService} from '../../../shared/service/section.service';
import {ToastService} from '../../../shared/service/toast.service';


@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SectionsComponent implements OnInit {
  sections: Section[];
  pageTitle = 'Порядок заключения договоров и порядок оплаты за обучение порядок оплаты за обучение';
  addSectionTitle: string | null = null;
  movePageSection = '';
  // todo refactor
  sectionSearch: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? [] : this.sections.map(section => section.title)
        .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)))

  constructor(private sectionService: SectionService,
              private pageService: PageService,
              private toastService: ToastService,
              private router: Router,
              private modalService: NgbModal) {
    this.sections = [];
  }

  ngOnInit(): void {
    this.getSections();
    this.sectionService.getAll();
  }

  private getSections(): void {
    this.sectionService.sections$.subscribe(sections => this.sections = sections);
  }

  edit(id: number): void {
    this.router.navigate(['/edit-news/' + id]).then(r => {});
    this.getSections();
  }

  remove(id: number): void {
    this.sectionService.remove(id);
  }

  addSection(content: TemplateRef<any>): void {
    this.modalService.open(content, {size: 'md'}).closed.subscribe(() => {
      if (this.addSectionTitle == null) {
        this.toastService.show('Введите имя раздела', {classname: 'bg-danger text-light'});
        return;
      }
      // @ts-ignore
      this.sectionService.add({title: this.addSectionTitle});
    });
  }

  movePage(content: TemplateRef<any>, id: any): void {
    this.modalService.open(content, {size: 'md'}).closed.subscribe(() => {
      this.movePageSection = this.movePageSection === '' ? 'default' : this.movePageSection;
      const matchingSections = this.sections.filter(section => section.title === this.movePageSection);
      this.movePageSection = '';
      if (matchingSections.length < 1) {
        this.toastService.show('Указанный раздел не существует', {classname: 'bg-danger text-light'});
      }
      const newSectionId = matchingSections[0].id;
      // @ts-ignore
      this.pageService.movePage(id, newSectionId);
    });
  }

  removePage(content: TemplateRef<any>, id: any): void {
    this.modalService.open(content, {backdrop: 'static', size: 'md'})
      .closed.subscribe(() => this.pageService.remove(id));
  }

  editPage(id: any): void {
    this.router.navigate([`/admin/edit/page/${+id}`]);
  }

  addPage(idSection: number): void {
    this.router.navigate([`/admin/create/page/`], {state: {sectionId: idSection}});
  }

  removeSection(content: TemplateRef<any>, id: number): void {
    this.modalService.open(content, {backdrop: 'static', size: 'md'})
      .closed.subscribe(() => this.sectionService.remove(id));
  }
}
