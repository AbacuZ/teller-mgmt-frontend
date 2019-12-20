import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { SearchService, ExportExcelService } from '@app/core';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAaYrY2xomIlXn_kJdK139_-SlqIIRP6TY'
    })
  ],
  declarations: [
    SearchComponent
  ],
  providers: [
    SearchService,
    ExportExcelService
  ]
})
export class SearchModule { }
