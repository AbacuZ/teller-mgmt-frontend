import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TellerRoutingModule } from './teller-routing.module';
import { CreateTellerComponent } from './components/create-teller/create-teller.component';
import { EditTellerComponent } from './components/edit-teller/edit-teller.component';
import { ListTellerComponent } from './components/list-teller/list-teller.component';

@NgModule({
  imports: [
    CommonModule,
    TellerRoutingModule
  ],
  declarations: [CreateTellerComponent, EditTellerComponent, ListTellerComponent]
})
export class TellerModule { }
