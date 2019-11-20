import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService, UserService, DropdownService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  subscription: Subscription;
  isShowButton: Boolean = false;
  isShowEye: Boolean = false;
  isNextForm: Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private dropdownService: DropdownService) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  showPassword() {
    this.isShowButton = !this.isShowButton;
    this.isShowEye = !this.isShowEye;
  }

  saveForm(form: any) {
    this.isNextForm = true;

    if (form.invalid) {
      return false;
    }

    return true;
  }

  login() {
    if (this.saveForm(this.loginForm)) {
      this.subscription = this.userService.userLogin(this.loginForm.value.user, this.loginForm.value.password)
        .subscribe(result => {
          if (result.valid) {
            this.subscription = this.userService.findByUsername(this.loginForm.value.user).subscribe(
              async res => {
                this.authService.setLogin(this.loginForm.value.user);
                this.userService.setCurrentUser(res);
                this.router.navigate(['/search']);
              }
            );
          }
        }
        );
    }
  }

}
