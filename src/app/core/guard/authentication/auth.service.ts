import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private userLoggedIn = new Subject<boolean>();
  private isLogin: Boolean = false;

  constructor(private router: Router) { }

  setLogin(username: any) {
    sessionStorage.setItem('token', username);
  }

  getLogin() {
    return sessionStorage.getItem('token') != null;
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
