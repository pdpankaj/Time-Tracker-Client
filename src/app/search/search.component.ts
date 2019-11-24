
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClientService, Employee } from '../service/httpclient.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public employees: Employee[] = [];
  public allEmployees: Employee[] = [];

  public employee: Employee = null;
  public relevantEmployee: Employee = null;

  public searchFirstName = "";
  public searchlastName = "";
  public searchEmail = "";
  // Pagination parameters.
  searchPage: Number = 1;
  searchCount: Number = 5;

  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.httpClientService.getEmployees().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    this.employees = response;
    this.allEmployees = response;
  }

  /*showAll() removes search constraints and makes the 
  html table show every entry in the database */
  public showAll() {
    this.employees = this.allEmployees;
  }

  /*searchClick() constrains the list of displayed employees by 
  first name, last name, email*/
  public searchClick() {
    this.employees = [];

    //alert("searchClick()");

    //for each entry in 'allemployees'...
    for (let i = 0; i < this.allEmployees.length; i++) {
      //check name
      if (this.searchFirstName.length > 0) {
        if (!this.allEmployees[i].firstName.toUpperCase().includes(this.searchFirstName.toUpperCase()))
          continue;
      }
      //check email
      if (this.searchEmail.length > 0) {
        if (!this.allEmployees[i].emailId.toUpperCase().includes(this.searchEmail.toUpperCase()))
          continue;
      }
      //check phone
      if (this.searchlastName.length > 0) {
        if (!this.allEmployees[i].lastName.toUpperCase().includes(this.searchlastName.toUpperCase()))
          continue;
      }
      this.employees.push(this.allEmployees[i]);
    }//end of for loop
  }

  public setEmployeeId(id: number) {
    this.httpClientService.setEmployeeId(id);
  }

  public setEmployeeEmailId(emailId: string) {
    this.httpClientService.setEmployeeEmailId(emailId);
  }

  existingEmployee(employee: Employee): void {
    this.httpClientService.setEmployee(employee)
  };

  deleteEmployee(employee: Employee): void {
    this.httpClientService.deleteEmployee(employee)
      .subscribe( data => {
       this.employees = this.employees.filter(u => u !== employee);
    })
 };
 
}
