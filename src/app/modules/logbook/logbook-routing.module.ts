import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListLogbookComponent } from './components/list-logbook/list-logbook.component';
import { CreateLogbookComponent } from './components/create-logbook/create-logbook.component';
import { EditLogbookComponent } from './components/edit-logbook/edit-logbook.component';

const routes: Routes = [
  {
    path: 'search/:id',
    component: ListLogbookComponent,
    data: {
      title: 'ค้นหา'
    }
  },
  {
    path: 'create/:id',
    component: CreateLogbookComponent,
    data: {
      title: 'สร้าง'
    }
  },
  {
    path: 'edit/:id',
    component: EditLogbookComponent,
    data: {
      title: 'แก้ไข'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogbookRoutingModule { }
