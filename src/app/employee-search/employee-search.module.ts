import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeSearchComponent } from './employee-search.component';
import { SearchComponent } from '../search/search.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientService } from '../service/httpclient.service';
import { FilterPipe } from '../pipe/filter.pipe';
import { EmployeeRoutes } from './employee-search-routing.module';


@NgModule({
  imports:      [ CommonModule, FormsModule, ReactiveFormsModule, EmployeeRoutes ],
  declarations: [ EmployeeSearchComponent, SearchComponent, EmployeeListComponent, FilterPipe ],
  providers: [ HttpClientService ]
})
export class EmployeeSearchModule { }
