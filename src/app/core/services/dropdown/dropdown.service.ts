import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DropdownService {

  constructor(private http: HttpClient) {}
}
