import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClientService, Employee } from '../service/httpclient.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {

  employee: Employee = new Employee(-1, "", "", "", "", "");
  public adding = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpClientService: HttpClientService
  ) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      inTime: ['', Validators.required],
      outTime: ['', Validators.required]
    },
      { validators: this.InOutTimeValidation });

    let existingEmployee = this.httpClientService.getEmployee();
    if (existingEmployee) {
      //this.httpClientService.getEmployeeByEmailId().subscribe(
      //response => this.handleResponse(response),
      //);
      this.addForm.controls.firstName.setValue(existingEmployee.firstName);
      this.addForm.controls.lastName.setValue(existingEmployee.lastName);
      this.addForm.controls.emailId.setValue(existingEmployee.emailId);
      this.addForm.controls.inTime.setValue('');
      this.addForm.controls.outTime.setValue('');
    }
  }

  handleResponse(response) {
    this.employee = response;
    this.addForm.controls.firstName.setValue(this.employee.firstName);
    this.addForm.controls.lastName.setValue(this.employee.lastName);
    this.addForm.controls.emailId.setValue(this.employee.emailId);
    this.addForm.controls.inTime.setValue('');
    this.addForm.controls.outTime.setValue('');
  }

  onSubmit(): void {
    if (this.addForm.invalid) {
      return;
    }

    console.log("Employee creation started.");
    this.httpClientService.createEmployee(this.addForm.value)
      .subscribe(data => {
        console.log("Employee created successfully.");
        this.router.navigate(['employeesearch']);
      });

  };

  InOutTimeValidation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    try {
      let inTime = control.get('inTime').value;
      let outTime = control.get('outTime').value;
      if (inTime > outTime && outTime) {
        console.log("Please set an Out Date and Time that is after the In Date and Time.");
        alert("Please set an Out Time that is after the In Time.");
        control.get('outTime').setValue('');
        return {};

      } else {
        return {};
      }
    } catch (err) {
    }
  };



}