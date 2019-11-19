import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TellerDetailsRoutingModule } from './teller-details-routing.module';
import { ListTellerDetailsComponent } from './components/list-teller-details/list-teller-details.component';
import { CreateTellerDetailsComponent } from './components/create-teller-details/create-teller-details.component';
import { EditTellerDetailsComponent } from './components/edit-teller-details/edit-teller-details.component';

@NgModule({
  imports: [
    CommonModule,
    TellerDetailsRoutingModule
  ],
  declarations: [ListTellerDetailsComponent, CreateTellerDetailsComponent, EditTellerDetailsComponent]
})
export class TellerDetailsModule { }
