import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { LogBookService, UserService } from '@app/core';
import { IMyOptions } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-logbook',
  templateUrl: './create-logbook.component.html',
  styleUrls: ['./create-logbook.component.css']
})
export class CreateLogbookComponent implements OnInit, OnDestroy {

  createLogBookForm: FormGroup;
  subscription: Subscription;
  isNextForm: Boolean = false;
  placeholder: String = 'วว/ดด/ปปปป';
  idParams: number = +this.route.snapshot.paramMap.get('id');

  public dateTimePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
    alignSelectorRight: true
  };

  constructor(private formBuilder: FormBuilder,
    private logbookService: LogBookService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.updateForm();
  }

  ngOnDestroy() {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }

  initForm() {
    this.createLogBookForm = this.formBuilder.group({
      tellerNo: [{ value: '', disabled: true }, Validators.required],
      dateTime: ['', Validators.required],
      problem: ['', Validators.required],
      solution: ['', Validators.required]
    });
  }

  get f() {
    return this.createLogBookForm.controls;
  }

  updateForm() {
    this.subscription = this.logbookService.findTellerById(this.idParams).subscribe(result => {
      this.createLogBookForm.controls['tellerNo'].setValue(result.tellerNo);
    });
  }

  saveForm(form: any) {
    this.isNextForm = true;

    if (form.invalid) {
      return false;
    }

    this.logbookService.setLogbook(this.createLogBookForm.value, this.userService.getUsername(), this.idParams);
    return true;
  }

  save() {
    if (this.saveForm(this.createLogBookForm)) {
      this.subscription = this.logbookService.createLogBook().subscribe(result => {
        if (result) {
          this.logbookService.clear();
          this.router.navigate(['/logbook/search', this.idParams]);
        }
      });
    }
  }

}
