import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls:['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  tabs  = 'login';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'usuario': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'tipo':['',Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Login' : 'Registro';
      this.authForm.removeControl('email');
      this.authForm.removeControl('tipo');
    });
  }

  segmentButtonClicked(ev: any) {
    if(ev == 'register'){
      this.tabs = 'register';
      this.authType = 'signup_user';
      this.title = "Registro";
      this.authForm.addControl('email', new  FormControl('', Validators.required));
      this.authForm.addControl('tipo', new  FormControl('', Validators.required));
    }else if(ev == 'login'){
      this.tabs = 'login';
      this.authType = 'login';
      this.title = "Login";
      this.authForm.removeControl('email');
      this.authForm.removeControl('tipo');
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    console.log(credentials);
    this.userService.attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
