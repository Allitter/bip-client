import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthResponse, User} from '../../shared/interfaces';
import {Observable, Subject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    // @ts-ignore
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token') as string;
  }

  login(user: User): Observable<AuthResponse> {
    // temporal stub
    if (user.email === 'd@mail.ru' && user.password === '1111') {
      return new Observable<AuthResponse>(subscriber => {
        setTimeout(() => {
          subscriber.next({idToken: 'lkJKFSKJnksdnKJnkdf', expiresIn: '3600'});
          this.setToken({idToken: 'lkJKFSKJnksdnKJnkdf', expiresIn: '3600'});
          subscriber.complete();
        }, 1500);
      });
    } else {
      return new Observable<AuthResponse>(subscriber => {
        setTimeout(() => {
          this.error$.next('Неверный логин или пароль');
          subscriber.error();
        }, 1500);
      });
    }

    // @ts-ignore
    return this.http.post<any>('', user)
      .pipe(
        // @ts-ignore
        tap(this.setToken),
        // @ts-ignore
        catchError(this.handleError.bind(this))
      );
  }

  logout(): any {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse): void {
    const {message: code} = error.error.code;

    switch (code) {
      case '4001':
        this.error$.next('Неверный логин или пароль');
        break;
    }
  }

  private setToken(response: AuthResponse | null): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
