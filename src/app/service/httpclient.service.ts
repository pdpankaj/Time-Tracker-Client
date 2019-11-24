import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

export class Employee {
  constructor(
    public empId: number,
    public firstName: string,
    public lastName: string,
    public emailId: string,
    public inTime: string,
    public outTime: string
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  
  setGroupFilter$ = new Subject<any>();
  getGroupFilter = this.setGroupFilter$.asObservable();
  
  constructor(
    private httpClient: HttpClient
  ) {
  }

  getEmployees() : Observable<any> {
    console.log('******   getEmployees');
    return this.httpClient.get<Employee[]>('http://localhost:8080/employees');
  }

  getEmployeeByEmailId() : Observable<any> {
    console.log('******   getEmployeeByEmailId');
    return this.httpClient.get<Employee[]>("http://localhost:8080/employees" + "/email/" + this.getEmployeeEmailId());
  }

  public deleteEmployee(employee) {
    console.log('deleteEmployee');
    return this.httpClient.delete<Employee>("http://localhost:8080/employees" + "/" + employee.empId);
  }

  public createEmployee(employee) {
    console.log('****  createEmployee '+employee);
    return this.httpClient.post<Employee>("http://localhost:8080/employees", employee);
  }

  remployeeId: number = -1;
  remailId: string = "";
  remployee: Employee = null;

  public getEmployeeId(){
    return this.remployeeId;
  }

  public setEmployeeId(id: number){
    this.remployeeId = id;
  }

  public getEmployee(){
    return this.remployee;
  }

  public setEmployee(remployee: Employee){
    this.remployee = remployee;
  }

  public getEmployeeEmailId(){
    return this.remailId;
  }

  public setEmployeeEmailId(emailId: string){
    this.remailId = emailId;
  }
}