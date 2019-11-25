import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Teller, TellerDetails } from './teller.model';

@Injectable()
export class TellerService {

  private API = environment.endpoint;
  private TELLER_API = this.API + '/api/v1/tellermgmt/teller';
  private SEARCH_TELLER_API = this.API + '/api/v1/tellermgmt/teller/search';

  constructor(private http: HttpClient) { }

  private teller: Teller = new Teller();
  private tellerDetails: TellerDetails = new TellerDetails();
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
    const data = { teller: this.getTeller(), tellerDetails: this.getTellerDetails() };
    return this.http.post(this.TELLER_API, data);
  }

  setTeller(data: any) {
    this.teller.tellerNo = data.tellerNo;
    this.teller.tellerAddress = data.tellerAddress;
    this.teller.latitude = data.latitude;
    this.teller.longitude = data.longitude;
    this.teller.serial = data.serial;
    this.teller.telTellerAddress = data.telTellerAddress;
    this.teller.branch = data.branch;
    this.teller.gprsCompany = data.gprsCompany;
    this.teller.zoneId = data.zoneId;
    this.teller.provinceId = data.provinceId;
    this.teller.districtId = data.districtId;
    this.teller.versionTellerId = data.versionTellerId;
    this.teller.brandTellerId = data.brandTellerId;
    this.teller.typeTellerId = data.typeTellerId;
    this.teller.typeAddressId = data.typeAddressId;
  }

  getTeller() {
    return this.teller;
  }

  setTellerDetails(data: any) {
    this.tellerDetails.indexMasterKey = data.indexMasterKey;
    this.tellerDetails.ipAddress = data.ipAddress;
    this.tellerDetails.ipGateway = data.ipGateway;
    this.tellerDetails.localPort = data.localPort;
    this.tellerDetails.servicePort = data.servicePort;
  }

  getTellerDetails() {
    return this.tellerDetails;
  }

  setDataTables(data: any[], brand: any[], versionTeller: any[]) {
    data.forEach(res => {
      res['brand'] = this.setBrand(res.versionTellerId, brand, versionTeller);
      res['versionTeller'] = this.setversionTeller(res.versionTellerId, versionTeller);
    });
  }

  clear() {
    this.teller.Clear();
    this.tellerDetails.Clear();
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
