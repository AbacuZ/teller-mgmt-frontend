import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleService {

  private API = environment.endpoint;
  private ROLE_API = this.API + '/api/v1/tellermgmt/role';

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(this.ROLE_API);
  }

  findById(id: any): Observable<any> {
    return this.http.get(this.ROLE_API + '/' + id);
  }
}
