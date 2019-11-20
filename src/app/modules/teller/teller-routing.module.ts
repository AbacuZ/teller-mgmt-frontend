import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTellerComponent } from './components/list-teller/list-teller.component';
import { CreateTellerComponent } from './components/create-teller/create-teller.component';
import { EditTellerComponent } from './components/edit-teller/edit-teller.component';

const routes: Routes = [
  {
    path: 'search',
    component: ListTellerComponent,
    data: {
      title: 'ค้นหา Teller Details'
    }
  },
  {
    path: 'create',
    component: CreateTellerComponent,
    data: {
      title: 'สร้าง Teller Details'
    }
  },
  {
    path: 'edit/:id',
    component: EditTellerComponent,
    data: {
      title: 'แก้ไข Teller Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TellerRoutingModule { }
