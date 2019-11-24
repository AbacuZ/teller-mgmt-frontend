import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Teller } from './teller.model';

@Injectable()
export class TellerService {

  private API = environment.endpoint;
  private TELLER_API = this.API + '/api/v1/tellermgmt/teller';
  private SEARCH_TELLER_API = this.API + '/api/v1/tellermgmt/teller/search';

  constructor(private http: HttpClient) { }

  private teller: Teller = new Teller();
  public result: any[];

  findAll(): Observable<any> {
    return this.http.get(this.SEARCH_TELLER_API);
  }

  findAllPaging(pageNo: number, pageSize: number): Observable<any> {
    return this.http.get(this.SEARCH_TELLER_API + `?pageNo=${pageNo}&pageSize=${pageSize}`);
  }

  findById(id: any): Observable<any> {
    return this.http.get(this.TELLER_API + '/' + id);
  }

  createTeller(): Observable<any> {
    return this.http.post(this.TELLER_API, this.teller);
  }

  setDataTables(data: any[], brand: any[], versionTeller: any[]) {
    data.forEach(res => {
      res['brand'] = this.setBrand(res.versionTellerId, brand, versionTeller);
      res['versionTeller'] = this.setversionTeller(res.versionTellerId, versionTeller);
    });
  }

  private setBrand(id: any, brand: any[], versionTeller: any[]) {
    const data = versionTeller.find(res => res.versionTellerId === id);
    const result = brand.find(res => res.brandTellerId === data.brandTellerId);
    return result.brandTellerName;
  }

  private setversionTeller(id: any, versionTeller: any[]) {
    const data = versionTeller.find(res => res.versionTellerId === id);
    return data.versionTellerName;
  }

}
