import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { dtOptions } from '@app/shared';
import { UserService } from '@app/core/services/user/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  subscription: Subscription;
  rowDatas: any[] = [];
  userId: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
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

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  initDtOptions() {
    this.dtOptions = dtOptions;
  }

  initSearch() {
    this.subscription = this.userService.findAll().subscribe(result => {
      this.rowDatas = result;
    });
  }

  setModal(id: any) {
    this.userId = id;
  }

  deleteRow() {
    this.subscription = this.userService.deleteUser(this.userId).subscribe(async result => {
      $('.psn-close').click();
      this.initSearch();
      this.rerender();
    });
  }

}
