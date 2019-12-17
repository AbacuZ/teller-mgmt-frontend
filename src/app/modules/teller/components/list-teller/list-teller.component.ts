import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { dtOptionsSearch } from '@app/shared';
import { TellerService, DropdownService, UserService } from '@app/core';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-teller',
  templateUrl: './list-teller.component.html',
  styleUrls: ['./list-teller.component.css']
})
export class ListTellerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  searchForm: FormGroup;
  subscription: Subscription;
  rowDatas: any[];
  recordsTotal: any = null;
  brand: any[];
  versionTeller: any[];
  dataIndex: any;
  tellerId: any;
  isDelete: Boolean = false;

  constructor(private tellerService: TellerService,
    private dropdownService: DropdownService,
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getDropdownData();
    this.initDtOptions();
    this.initForm();
    this.initSearch();
    this.initDeleteButton();
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

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
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

  initDeleteButton() {
    this.isDelete = this.userService.getRole() !== 'Admin';
  }

  initDtOptions() {
    this.dtOptions = dtOptionsSearch;
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      tellerNo: ['']
    });
  }

  initSearch() {
    this.dtOptions.serverSide = true;
    this.dtOptions.deferRender = true;
    this.dtOptions.ajax = (dataTablesParameters: any, callback) => {
      const pageNo = dataTablesParameters.start / dataTablesParameters.length;
      const pageSize = dataTablesParameters.length;
      this.subscription = forkJoin(
        this.tellerService.findAllPaging(pageNo, pageSize),
        this.dropdownService.findAllBrand(),
        this.dropdownService.finAllVersion()
      ).subscribe(result => {
        if (result[0].tellerResult) {
          console.log(result[0].tellerResult);
          this.dataIndex = dataTablesParameters.start;
          this.recordsTotal = result[0].recordsTotal;
          this.tellerService.setDataTables(result[0].tellerResult, result[1], result[2]);
          this.rowDatas = result[0].tellerResult;
        }
        callback({
          recordsTotal: result[0].recordsTotal,
          recordsFiltered: result[0].recordsTotal,
          data: []
        });
      });
    };
  }

  find() {
    if (this.searchForm.value.tellerNo) {
      this.dtOptions.serverSide = true;
      this.dtOptions.deferRender = true;
      this.dtOptions.ajax = (dataTablesParameters: any, callback) => {
        const pageNo = dataTablesParameters.start / dataTablesParameters.length;
        const pageSize = dataTablesParameters.length;
        this.subscription = forkJoin(
          this.tellerService.findTellerNoWithPaging(this.searchForm.value.tellerNo, pageNo, pageSize),
          this.dropdownService.findAllBrand(),
          this.dropdownService.finAllVersion()
        ).subscribe(result => {
          if (result[0].tellerResult) {
            this.dataIndex = dataTablesParameters.start;
            this.recordsTotal = result[0].recordsTotal;
            this.tellerService.setDataTables(result[0].tellerResult, result[1], result[2]);
            this.rowDatas = result[0].tellerResult;
          }
          callback({
            recordsTotal: result[0].recordsTotal,
            recordsFiltered: result[0].recordsTotal,
            data: []
          });
        });
      };
    } else {
      this.initSearch();
    }
    this.rerender();
  }

  clear() {
    this.searchForm.reset();
    this.initForm();
    this.initSearch();
    this.rerender();
  }

  setModal(id: any) {
    this.tellerId = id;
  }

  deleteRow() {
    this.subscription = this.tellerService.deleteTeller(this.tellerId).subscribe(async result => {
      $('.psn-close').click();
      this.initSearch();
      this.rerender();
    });
  }

}
