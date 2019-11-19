import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable()
export class UserService {

  private API = environment.endpoint;
  private USER_API = this.API + '/api/v1/tellermgmt/user';
  private EDIT_USER_API = this.API + '/api/v1/tellermgmt/user/edit';
  private DELETE_USER_API = this.API + '/api/v1/tellerment/user/delete';

  constructor(private http: HttpClient) { }

  private user: User = new User();

  findAll(): Observable<any> {
    return this.http.get(this.USER_API);
  }

  findById(id: any): Observable<any> {
    return this.http.get(this.USER_API + '/' + id);
  }

  createUser(): Observable<any> {
    return this.http.post(this.USER_API, this.user);
  }

  editUser(id: any): Observable<any> {
    return this.http.put(this.EDIT_USER_API + '/' + id, this.user);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.DELETE_USER_API + '/' + id);
  }

  setUserData(data: any) {
    this.user.email = data.email;
    this.user.firstname = data.firstname;
    this.user.lastname = data.lastname;
    this.user.password = data.password;
    this.user.position = data.position;
    this.user.roleId = data.roleId;
    this.user.telephone = data.telephone;
    this.user.username = data.username;
  }
}
