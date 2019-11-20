import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { UserService } from '@app/core/services';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getLogin()) {
      return this.getCurrentUserData() ? this.getUserDataAndSessionTimeout() : true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  private getCurrentUserData(): boolean {
    return !this.userService.getUsername();
  }

  private getUserDataAndSessionTimeout(): Observable<boolean> | Promise<boolean> | boolean {
    const subject = new Subject<any>();
    this.userService.findByUsername(sessionStorage.getItem('token')).subscribe(async result => {
      this.userService.setCurrentUser(result);
      subject.next(true);
    });
    return subject.asObservable();
  }
}
