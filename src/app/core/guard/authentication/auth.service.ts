import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private userLoggedIn = new Subject<boolean>();
  private isLogin: Boolean = false;

  constructor(private router: Router) { }

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

  logout() {
    this.isLogin = false;
    this.router.navigate(['/login']);
  }

}
