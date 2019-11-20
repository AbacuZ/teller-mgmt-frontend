import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TellerRoutingModule } from './teller-routing.module';
import { CreateTellerComponent } from './components/create-teller/create-teller.component';
import { EditTellerComponent } from './components/edit-teller/edit-teller.component';
import { ListTellerComponent } from './components/list-teller/list-teller.component';
import { TellerService } from '@app/core';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TellerRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CreateTellerComponent,
    EditTellerComponent,
    ListTellerComponent
  ],
  providers: [
    TellerService
  ]
})
export class TellerModule { }
