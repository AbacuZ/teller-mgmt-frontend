import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DropdownService {

  private API = environment.endpoint;
  private BRAND_API = this.API + '/api/v1/tellermgmt/brandteller';
  private VERSION_API = this.API + '/api/v1/tellermgmt/version';
  private PROVINCE_API = this.API + '/api/v1/tellermgmt/province';
  private DISTRICT = this.API + '/api/v1/tellermgmt/district';
  private ZONE_API = this.API + '/api/v1/tellermgmt/zone';
  private TYPE_TELLER_API = this.API + '/api/v1/tellermgmt/typeteller';
  private TYPE_ADDRESS_API = this.API + '/api/v1/tellermgmt/typeaddress';

  constructor(private http: HttpClient) { }

  findAllBrand(): Observable<any> {
    return this.http.get(this.BRAND_API);
  }

  finAllVersion(): Observable<any> {
    return this.http.get(this.VERSION_API);
  }

  findAllProvince(): Observable<any> {
    return this.http.get(this.PROVINCE_API);
  }

  findAllDistrict(): Observable<any> {
    return this.http.get(this.DISTRICT);
  }

  findAllZone(): Observable<any> {
    return this.http.get(this.ZONE_API);
  }

  findAllTypeTeller(): Observable<any> {
    return this.http.get(this.TYPE_TELLER_API);
  }

  findAllTypeAddress(): Observable<any> {
    return this.http.get(this.TYPE_ADDRESS_API);
  }
}
