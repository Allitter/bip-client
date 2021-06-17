import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {saveAs} from 'file-saver';
import {HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthService} from '../../service/auth.service';
import {DocumentService} from '../../../shared/service/document.service';
import {FileService} from '../../../shared/service/file.service';
import {Document} from '../../../shared/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  documents: Document[] = [];
  selectedFile: File | null = null;
  showCopiedMessage = false;
  @Input() searchName = '';
  filenames: string[] = [];
  fileStatus = {status: '', requestType: '', percent: 0};

  constructor(private router: Router,
              private auth: AuthService,
              private modalService: NgbModal,
              private documentService: DocumentService,
              private fileService: FileService) {
  }

  ngOnInit(): void {
  }

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/']).then(() => {
    });
  }

  openMediaLibrary(content: any): void {
    this.modalService.open(content, {scrollable: true, size: 'xl'});
    setTimeout(() => this.documentService.getAll(null)
      // @ts-ignore
      .subscribe(files => this.documents = files), 500);
  }

  findFiles(name: string | null): void {
    this.fetchFiles(name);
  }

  private fetchFiles(name: string | null): void {
    this.documentService.getAll(name).subscribe(files => this.documents = files);
  }

  copyMessage(val: string): any {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = 'http://localhost:8080/download/' + val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    // this.toastService.show('Ссылка скопирована в буфер обмена');
    this.showCopiedMessage = true;
    setTimeout(() => {
      this.showCopiedMessage = false;
    }, 1000);
  }


  handleFileInput(files: File[]): void {
    this.selectedFile = files[0];
  }

  removeFile(content: any, id: any): void {
    this.modalService.open(content, {backdrop: 'static', size: 'md'})
      .closed.subscribe(() => {
      this.documentService.remove(id).subscribe(() => {
        this.fetchFiles(this.searchName);
      });
    });
  }

  onUploadFiles(): void {
    if (this.selectedFile === null) {
      return;
    }
    const formData = new FormData();
    this.selectedFile = this.selectedFile == null ? new File([], '') : this.selectedFile;
    formData.append('file', this.selectedFile, this.selectedFile?.name);
    this.fileService.upload(formData).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      },
      () => {
        this.fetchFiles(this.searchName);
        this.selectedFile = null;
      }
    );
  }

  downloadFile(document: Document): void {
    this.fileService.download(document.name).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event, document.originName);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private reportProgress(httpEvent: HttpEvent<string[] | Blob>, filename?: string): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Отправка файла на сервер...');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Скачивание...');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        filename = filename === undefined ? 'file' : filename;
        this.handleHttpTypeResponse(httpEvent, filename);
        break;
      default:
        console.log(httpEvent);
        break;
    }
  }

  private handleHttpTypeResponse(httpEvent: HttpResponse<string[] | Blob>, name: string): void {
    if (httpEvent.url === 'http://localhost:8080/files') {
      this.fileStatus.status = 'done';
    } else {
      // @ts-ignore
      saveAs(new File([httpEvent.body!], name,
        {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
    }
    this.fileStatus.status = 'done';
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }
}
