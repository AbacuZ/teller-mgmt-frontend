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
  private EXPORT_EXCEL_API = this.API + '/api/v1/tellermgmt/teller/export-excel';

  constructor(private http: HttpClient) { }

  private searchCriteria: SearchCriteria = new SearchCriteria();
  private result: any[];

  findMap(): Observable<any> {
    return this.http.post(this.SEARCH_TELLER_API, this.getSearchCriteria());
  }

  findAll(): Observable<any> {
    return this.http.get(this.TELLER_API);
  }

  findTellerDetailsById(id: any): Observable<any> {
    return this.http.get(this.TELLER_DETAILS_API + '/' + id);
  }

  findNearestLocation(lat: any, lng: any): Observable<any> {
    const data = { lat: lat, lng: lng };
    return this.http.post(this.TELLER_API + '/find-nearest-location', data);
  }

  exportExcel(): Observable<any> {
    return this.http.post(this.EXPORT_EXCEL_API, this.getSearchCriteria());
  }

  exportExcelMap(lat: any, lng: any): Observable<any> {
    const data = { lat: lat, lng: lng };
    return this.http.post(this.TELLER_API + '/export-excel-map', data);
  }

  setSearchCriteria(data: any) {
    this.searchCriteria.tellerAddress = data.tellerAddress;
    this.searchCriteria.zoneId = data.zone;
    this.searchCriteria.districtId = data.district;
    this.searchCriteria.provinceId = data.province;
    this.searchCriteria.versionTellerId = data.versionTeller;
    this.searchCriteria.brandTellerId = data.brandTellerId;
    this.searchCriteria.typeTellerId = data.typeTellerId;
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
