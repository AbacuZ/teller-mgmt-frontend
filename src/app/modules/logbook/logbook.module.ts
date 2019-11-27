import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogbookRoutingModule } from './logbook-routing.module';
import { ListLogbookComponent } from './components/list-logbook/list-logbook.component';
import { CreateLogbookComponent } from './components/create-logbook/create-logbook.component';
import { EditLogbookComponent } from './components/edit-logbook/edit-logbook.component';
import { DataTablesModule } from 'angular-datatables';
import { LogBookService } from '@app/core';

@NgModule({
  imports: [
    CommonModule,
    LogbookRoutingModule,
    DataTablesModule
  ],
  declarations: [
    ListLogbookComponent,
    CreateLogbookComponent,
    EditLogbookComponent
  ],
  providers: [
    LogBookService
  ]
})
export class LogbookModule { }
