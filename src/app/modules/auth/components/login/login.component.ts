import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  subscription: Subscription;
  isShowButton: Boolean = false;
  isShowEye: Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  showPassword() {
    this.isShowButton = !this.isShowButton;
    this.isShowEye = !this.isShowEye;
  }

}
