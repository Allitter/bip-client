import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProcessUptime, SystemCpu, SystemHealth} from '../../../shared/interfaces';
import {DashboardService} from '../../service/dashboard.service';
import {NavigationEnd, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  page = 3;
  pageSize = 10;
  traceList: any[] = [];
  selectedTrace?: any;
  systemCpu?: SystemCpu;
  processUptime?: ProcessUptime;
  systemHealth?: SystemHealth;
  http200traces: any[] = [];
  http400traces: any[] = [];
  http404traces: any[] = [];
  http500traces: any[] = [];
  httpDefaultTraces: any[] = [];
  activeInfoTab = 1;

  constructor(private dashboardService: DashboardService,
              private router: Router,
              private modalService: NgbModal) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.loadContent();
      }
    });
  }

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    this.loadProcessUptime();
    this.loadSystemCpu();
    this.loadSystemHealth();
    this.loadTraces();
  }

  private loadSystemHealth(): void {
    this.dashboardService.getSystemHealth().subscribe(
      systemHealth => {
        this.systemHealth = systemHealth;
      });
  }

  private loadProcessUptime(): void {
    this.dashboardService.getProcessUptime().subscribe(
      processUptime => {
        this.processUptime = processUptime;
      });
  }

  private loadSystemCpu(): void {
    this.dashboardService.getSystemCpu().subscribe(
      systemCpu => {
        this.systemCpu = systemCpu;
      }
    );
  }

  private loadTraces(): void {
    this.dashboardService.getHttpTraces().subscribe(
      traces => {
        this.traceList = traces;
        this.http200traces = [];
        this.http400traces = [];
        this.http404traces = [];
        this.http500traces = [];
        this.httpDefaultTraces = [];
        this.traceList.forEach(trace => {
          this.pushTraceToProperList(trace);
        });
      }
    );
  }

  private pushTraceToProperList(trace: any): void {
    switch (trace.response.status) {
      case 200:
        this.http200traces.push(trace);
        break;
      case 400:
        this.http400traces.push(trace);
        break;
      case 404:
        this.http404traces.push(trace);
        break;
      case 500:
        this.http500traces.push(trace);
        break;
      default:
        this.httpDefaultTraces.push(trace);
    }
  }

  showRequestInfo(requestInfoModal: TemplateRef<any>, trace: any): void {
    this.selectedTrace = trace;
    this.modalService.open(requestInfoModal, {scrollable: false, size: 'lg'});
  }

  convertDiskSpace(): string {
    if (this.systemHealth?.components?.diskSpace?.details.free === undefined) {
      return 'undefined';
    }

    const bytes: number = +this.systemHealth?.components?.diskSpace?.details.free;
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = 2 < 0 ? 0 : 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const sizeIndex = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, sizeIndex)).toFixed(dm)) + ' ' + sizes[sizeIndex];
  }
}
