import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './components/list-user/list-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'search',
    component: ListUserComponent,
    data: {
      title: 'ค้นหา user'
    }
  },
  {
    path: 'create',
    component: CreateUserComponent,
    data: {
      title: 'สร้าง user'
    }
  },
  {
    path: 'edit',
    component: EditUserComponent,
    data: {
      title: 'แก้ไข user'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
