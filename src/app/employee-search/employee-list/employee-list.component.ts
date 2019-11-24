import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { HttpClientService, Employee } from '../../service/httpclient.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnChanges {
  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;
  employees: any[] = [];
  filteredEmployees: any[] = [];
  constructor(private httpClientService: HttpClientService,
    private ref: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.loadEmployees();
  }
  ngOnChanges(): void {
    if (this.groupFilters) this.filteredEmployeesList(this.groupFilters, this.employees);
  }
  filteredEmployeesList(filters: any, employees: any): void {
    this.filteredEmployees = this.employees; //Reset employee List
    const keys = Object.keys(filters);
    const filterEmployee = employee => {
      let result = keys.map(key => {
        if (!~key.indexOf('Time')) {
          if (employee[key]) {
            return String(employee[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
          } else {
            return false;
          }
        }
      });
      // To Clean Array from undefined if the age is passed so the map will fill the gap with (undefined)
      result = result.filter(it => it !== undefined);
      // Filter the Age out from the other filters
      if (filters['inTime'] && filters['outTime']) {
        if (employee['Time']) {
          if (+employee['Time'] >= +filters['inTime'] && +employee['Time'] <= +filters['outTime']) {
            result.push(true);
          } else {
            result.push(false);
          }
        } else {
          result.push(false);
        }
      }
      return result.reduce((acc, cur: any) => { return acc & cur }, 1)
    }
    this.filteredEmployees = this.employees.filter(filterEmployee);
  }
  loadEmployees(): void {
    this.httpClientService.getEmployees()
      .subscribe(employees => this.employees = employees);
    this.filteredEmployees = this.filteredEmployees.length > 0 ? this.filteredEmployees : this.employees;
  }
}