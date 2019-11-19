import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '@app/core/services/user/user.service';
import { RoleService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnDestroy {

  createUserForm: FormGroup;
  isNextForm: Boolean = false;
  subscription: Subscription;
  roles: any[];

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router) { }

  ngOnInit() {
    this.dropdownData();
    this.initForm();
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  dropdownData() {
    this.subscription = this.roleService.findAll().subscribe(result => {
      this.roles = result;
    });
  }

  initForm() {
    this.createUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: [''],
      email: [''],
      telephone: [''],
      roleId: ['', Validators.required]
    });
  }

  get f() {
    return this.createUserForm.controls;
  }

  cancel() {
    this.router.navigate(['/user/search']);
  }

  saveForm(form: any) {
    this.isNextForm = true;

    if (form.invalid) {
      return false;
    }

    this.userService.setUserData(this.createUserForm.value);
    return true;
  }

  save() {
    if (this.saveForm(this.createUserForm)) {
      this.subscription = this.userService.createUser().subscribe(result => {
        if (result) {
          this.userService.clearUserData();
          this.router.navigate(['/user/search']);
        }
      });
    }
  }

}
