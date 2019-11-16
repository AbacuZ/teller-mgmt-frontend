import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private userLoggedIn = new Subject<boolean>();
  private isLogin: Boolean = false;

  constructor() { }

  setLogin() {
    this.isLogin = true;
  }

  getLogin() {
    return this.isLogin;
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

}
