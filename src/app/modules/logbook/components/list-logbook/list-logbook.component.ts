import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { dtOptions } from '@app/shared';
import { UserService, LogBookService } from '@app/core';

@Component({
  selector: 'app-list-logbook',
  templateUrl: './list-logbook.component.html',
  styleUrls: ['./list-logbook.component.css']
})
export class ListLogbookComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  subscription: Subscription;
  rowDatas: any[];
  idParams: number = +this.route.snapshot.paramMap.get('id');
  isDelete: Boolean = false;
  logBookId: any;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private logbookService: LogBookService) { }

  ngOnInit() {
    this.initDtOptions();
    this.initDeleteButton();
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

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  initDeleteButton() {
    this.isDelete = this.userService.getRole() !== 'Admin';
  }

  initDtOptions() {
    this.dtOptions = dtOptions;
  }

  initSearch() {
    this.subscription = this.logbookService.findLogBookByTellerId(this.idParams).subscribe(result => {
      this.rowDatas = result;
    });
  }

  setModal(id: any) {
    this.logBookId = id;
  }

  deleteRow() {
    this.subscription = this.logbookService.deleteLogBook(this.logBookId).subscribe(result => {
      $('.psn-close').click();
      this.initSearch();
    });
  }

}
