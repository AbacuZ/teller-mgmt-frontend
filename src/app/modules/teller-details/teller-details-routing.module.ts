import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTellerDetailsComponent } from './components/list-teller-details/list-teller-details.component';
import { CreateTellerDetailsComponent } from './components/create-teller-details/create-teller-details.component';
import { EditTellerDetailsComponent } from './components/edit-teller-details/edit-teller-details.component';

const routes: Routes = [
  {
    path: 'search',
    component: ListTellerDetailsComponent,
    data: {
      title: 'ค้นหา Teller Details'
    }
  },
  {
    path: 'create',
    component: CreateTellerDetailsComponent,
    data: {
      title: 'สร้าง Teller Details'
    }
  },
  {
    path: 'edit',
    component: EditTellerDetailsComponent,
    data: {
      title: 'แก้ไข Teller Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TellerDetailsRoutingModule { }
