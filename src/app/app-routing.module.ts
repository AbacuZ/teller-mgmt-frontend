import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/components/login/login.component';
import { AuthGuard } from '@app/core';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', redirectTo: '/search', pathMatch: 'full' },
      { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
      { path: '', loadChildren: './modules/search/search.module#SearchModule' },
      { path: 'user', loadChildren: './modules/user/user.module#UserModule' },
      { path: 'teller', loadChildren: './modules/teller/teller.module#TellerModule' },
      { path: 'logbook', loadChildren: './modules/logbook/logbook.module#LogbookModule' }
    ]
  },
  { path: 'login', component: LoginComponent, data: { title: 'ล็อคอิน' } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
