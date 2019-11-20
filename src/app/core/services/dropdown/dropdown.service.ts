import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DropdownService {

  private API = environment.endpoint;
  private BRAND_API = this.API + '/api/v1/tellermgmt/brandteller';
  private VERSION_API = this.API + '/api/v1/tellermgmt/version';
  private PROVINCE_API = this.API + '';
  private DISTRICT = this.API + '';

  constructor(private http: HttpClient) { }

  findAllBrand(): Observable<any> {
    return this.http.get(this.BRAND_API);
  }

  finAllVersion(): Observable<any> {
    return this.http.get(this.VERSION_API);
  }
}
