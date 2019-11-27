import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { SearchCriteria } from './search.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService {

  private API = environment.endpoint;
  private TELLER_API = this.API + '/api/v1/tellermgmt/teller';
  private TELLER_DETAILS_API = this.API + '/api/v1/tellermgmt/tellerdetails';
  private SEARCH_TELLER_API = this.API + '/api/v1/tellermgmt/teller/search-map';

  constructor(private http: HttpClient) { }

  private searchCriteria: SearchCriteria = new SearchCriteria();
  private result: any[];

  findMap(): Observable<any> {
    return this.http.post(this.SEARCH_TELLER_API, this.getSearchCriteria());
  }

  findTellerDetailsById(id: any): Observable<any> {
    return this.http.get(this.TELLER_DETAILS_API + '/' + id);
  }

  setSearchCriteria(data: any) {
    this.searchCriteria.districtId = data.districtId;
    this.searchCriteria.provinceId = data.provinceId;
    this.searchCriteria.tellerAddress = data.tellerAddress;
    this.searchCriteria.typeAddressId = data.typeAddressId;
    this.searchCriteria.versionTellerId = data.versionTellerId;
    this.searchCriteria.zoneId = data.zoneId;
  }

  getSearchCriteria() {
    return this.searchCriteria;
  }

  clearSearchCriteria() {
    this.searchCriteria.Clear();
  }

  setResult(data: any) {
    this.result = data;
  }

  getResult() {
    return this.result;
  }

  clearResult() {
    this.result = [];
  }

}
