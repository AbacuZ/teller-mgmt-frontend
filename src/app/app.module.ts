import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { AuthService, AuthGuard, DropdownService, UserService, ModalService } from '@app/core';
import { ModalComponent } from './layouts/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAaYrY2xomIlXn_kJdK139_-SlqIIRP6TY'
    })
  ],
  providers: [
    AuthGuard,
    AuthService,
    DropdownService,
    UserService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
