import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NewsService} from './service/news.service';
import {ToastService} from './service/toast.service';
import {NewsInfoComponent} from '../user/news-info/news-info.component';
import {FileService} from './service/file.service';
import {SafeHtmlPipe} from './service/SafeHtmlPipe';
import {PageInfoComponent} from '../user/page-info/page-info.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AllNewsComponent} from '../user/all-news/all-news.component';
import {FormsModule} from '@angular/forms';
import {DocumentService} from './service/document.service';

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    NgbModule,
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    NgbModule,
    SafeHtmlPipe,
  ],
  declarations: [
    NewsInfoComponent,
    SafeHtmlPipe,
    PageInfoComponent,
    AllNewsComponent
  ],
  providers: [NewsService, ToastService, DocumentService, FileService]
})
export class SharedModule {

}
