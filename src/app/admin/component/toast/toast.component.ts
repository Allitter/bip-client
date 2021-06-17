import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastService} from '../../../shared/service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  show = true;

  constructor(public toastService: ToastService) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.show = false;
    setTimeout(() => this.show = true, 5000);
  }

  isTemplate(toast: any): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
