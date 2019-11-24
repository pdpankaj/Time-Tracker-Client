import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClientService, Employee } from '../service/httpclient.service';

@Component({
  selector: 'app-existing-employee',
  templateUrl: './existing-employee.component.html',
  styleUrls: ['./existing-employee.component.css']
})
export class ExistingEmployeeComponent implements OnInit {

  public employee: Employee = null;

  constructor(private formBuilder: FormBuilder,private router: Router, private httpClientService: HttpClientService) { }

  existingEmployeeForm: FormGroup;

  ngOnInit() {
    let emailId = this.httpClientService.getEmployeeEmailId();
    if(!emailId) {
      alert("Invalid action.")
      this.router.navigate(['employeesearch']);
      return;
    }

    this.existingEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      inTime: ['', Validators.required],
      outTime: ['', Validators.required]
    },
    { validators: this.InOutTimeValidation });
    
    this.httpClientService.getEmployeeByEmailId().subscribe(
      response => this.handleResponse(response),
    );
  }

  handleResponse(response) {
    this.employee = response;
    this.existingEmployeeForm.controls.firstName.setValue(this.employee.firstName);
    this.existingEmployeeForm.controls.lastName.setValue(this.employee.lastName);
    this.existingEmployeeForm.controls.emailId.setValue(this.employee.emailId);
    this.existingEmployeeForm.controls.inTime.setValue('');
    this.existingEmployeeForm.controls.outTime.setValue('');
  }

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

  onSubmit(): void {
    if (this.existingEmployeeForm.invalid) {
      return;
    }

    console.log("Employee creation started.");
    this.httpClientService.createEmployee(this.existingEmployeeForm.value)
      .subscribe(data => {
        console.log("Employee created successfully.");
        this.router.navigate(['employeesearch']);
      });

  };

}
