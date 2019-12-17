import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, RoleService, ModalService } from '@app/core';
import { Subscription } from 'rxjs/Subscription';
import { CustomValidators } from '@app/shared';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  editUserForm: FormGroup;
  isNextForm: Boolean = false;
  subscription: Subscription;
  roles: any[];
  idParams: number = +this.route.snapshot.paramMap.get('id');

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit() {
    this.dropdownData();
    this.initForm();
    this.updateForm();
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
    this.editUserForm = this.formBuilder.group({
      username: [{ value: '', disabled: true }, Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
        Validators.minLength(8)])
      ],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: [''],
      email: [''],
      telephone: [''],
      roleId: ['', Validators.required]
    });
  }

  get f() {
    return this.editUserForm.controls;
  }

  updateForm() {
    this.subscription = this.userService.findById(this.idParams).subscribe(result => {
      this.editUserForm.patchValue({
        username: result.username,
        password: result.password,
        firstname: result.firstname,
        lastname: result.lastname,
        position: result.position,
        email: result.email,
        telephone: result.telephone,
        roleId: result.roleId
      });
    });
  }

  cancel() {
    this.router.navigate(['/user/search']);
  }

  saveForm(form: any) {
    this.isNextForm = true;

    if (form.invalid) {
      return false;
    }

    this.userService.setUserData(this.editUserForm.getRawValue());
    return true;
  }

  save() {
    if (this.saveForm(this.editUserForm)) {
      this.subscription = this.userService.editUser(this.idParams).subscribe(result => {
        if (result) {
          this.userService.clearUserData();
          this.modalService.setNormalStyle();
          this.modalService.setHeader('User');
          this.modalService.setContent('Edit User Success');
          this.modalService.setRoute('/user/search');
          this.modalService.open();
        }
      });
    }
  }

}
