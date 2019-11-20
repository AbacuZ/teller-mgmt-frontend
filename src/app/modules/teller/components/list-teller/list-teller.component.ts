import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { dtOptionsSearch } from '@app/shared';
import { TellerService, DropdownService } from '@app/core';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-list-teller',
  templateUrl: './list-teller.component.html',
  styleUrls: ['./list-teller.component.css']
})
export class ListTellerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  subscription: Subscription;
  rowDatas: any[];
  recordsTotal: any = null;
  brand: any[];
  versionTeller: any[];
  dataIndex: any;

  constructor(private tellerService: TellerService,
    private dropdownService: DropdownService) { }

  ngOnInit() {
    this.getDropdownData();
    this.initDtOptions();
    this.initSearch();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }

    if (this.dtTrigger != null) {
      this.dtTrigger.unsubscribe();
    }
  }

  getDropdownData() {
    this.subscription = forkJoin(
      this.dropdownService.findAllBrand(),
      this.dropdownService.finAllVersion()
    ).subscribe(async result => {
      this.brand = result[0];
      this.versionTeller = result[1];
    });
  }

  initDtOptions() {
    this.dtOptions = dtOptionsSearch;
  }

  initSearch() {
    this.dtOptions.serverSide = true;
    this.dtOptions.deferRender = true;
    this.dtOptions.ajax = (dataTablesParameters: any, callback) => {
      const pageNo = dataTablesParameters.start / dataTablesParameters.length;
      const pageSize = dataTablesParameters.length;
      this.subscription = this.tellerService.findAllPaging(pageNo, pageSize).subscribe(result => {
        if (result.tellerResult) {
          this.dataIndex = dataTablesParameters.start;
          this.recordsTotal = result.recordsTotal;
          this.tellerService.setDataTables(result.tellerResult, this.brand, this.versionTeller);
          this.rowDatas = result.tellerResult;
        }
        callback({
          recordsTotal: result.recordsTotal,
          recordsFiltered: result.recordsTotal,
          data: []
        });
      });
    };
  }

}
