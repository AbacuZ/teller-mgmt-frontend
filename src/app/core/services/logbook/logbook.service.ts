import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LogBook } from './logbook.model';

@Injectable()
export class LogBookService {

  private API = environment.endpoint;
  private LOGBOOK_API = this.API + '/api/v1/tellermgmt/logbook';
  private LOGBOOK_TELLER_ID_API = this.API + '/api/v1/tellermgmt/logbook/find-by-teller-id';

  constructor(private http: HttpClient) { }

  private logbook: LogBook = new LogBook();

  findLogBookByTellerId(id: any): Observable<any> {
    return this.http.get(this.LOGBOOK_TELLER_ID_API + '/' + id);
  }

  findById(id: any): Observable<any> {
    return this.http.get(this.LOGBOOK_API + '/' + id);
  }

  createLogBook(): Observable<any> {
    return this.http.post(this.LOGBOOK_API, this.getLogbook());
  }

  updateLogBook(): Observable<any> {
    return this.http.put(this.LOGBOOK_API, this.getLogbook());
  }

  deleteLogBook(id: any): Observable<any> {
    return this.http.delete(this.LOGBOOK_API + '/' + id);
  }

  setLogbook(data: any, username: any) {
    this.logbook.dateTime = data.datetime;
    this.logbook.problem = data.problem;
    this.logbook.solution = data.solution;
    this.logbook.tellerId = data.tellerId;
    this.logbook.username = username;
  }

  setUpdateLogbook(data: any, username: any, logbookId: any) {
    this.logbook.logbookId = logbookId;
    this.logbook.dateTime = data.datetime;
    this.logbook.problem = data.problem;
    this.logbook.solution = data.solution;
    this.logbook.tellerId = data.tellerId;
    this.logbook.username = username;
  }

  getLogbook() {
    return this.logbook;
  }

  clear() {
    this.logbook.Clear();
  }

}
