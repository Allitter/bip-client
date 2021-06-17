import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ProcessUptime, SystemCpu, SystemHealth} from '../../shared/interfaces';

@Injectable()
export class DashboardService {
  private serverInfoUrl = `${environment.serverUrl}/actuator`;


  constructor(private http: HttpClient) {
  }

  public getHttpTraces(): Observable<any[]> {
    return this.http.get<any>(`${this.serverInfoUrl}/httptrace`).pipe(
      map( response => {
        return response.traces;
      })
    );
  }

  public getSystemHealth(): Observable<SystemHealth> {
    return this.http.get<SystemHealth>(`${this.serverInfoUrl}/health`);
  }

  public getSystemCpu(): Observable<SystemCpu> {
    return this.http.get<SystemCpu>(`${this.serverInfoUrl}/metrics/system.cpu.count`);
  }

  public getProcessUptime(): Observable<ProcessUptime> {
    return this.http.get<ProcessUptime> (`${this.serverInfoUrl}/metrics/process.uptime`);
  }
}
