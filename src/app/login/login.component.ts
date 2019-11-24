import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  
  loginForm: FormGroup;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder,private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    //alert('1 '+this.loginForm.invalid)
    if (this.loginForm.invalid) {
      return;
    }

    (this.loginservice.authenticate(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe(
      data => {
          this.router.navigate(['']);
      },
      error => {
        this.invalidLogin = true

      }
    )
    );

  }

}