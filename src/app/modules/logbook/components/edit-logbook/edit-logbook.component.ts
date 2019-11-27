import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { IMyOptions } from 'mydatepicker';
import { LogBookService, UserService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { setFormDateThai } from '@app/shared';

@Component({
  selector: 'app-edit-logbook',
  templateUrl: './edit-logbook.component.html',
  styleUrls: ['./edit-logbook.component.css']
})
export class EditLogbookComponent implements OnInit, OnDestroy {

  updateLogBookForm: FormGroup;
  subscription: Subscription;
  isNextForm: Boolean = false;
  placeholder: String = 'วว/ดด/ปปปป';
  tellerId: number = +this.route.snapshot.paramMap.get('tellerId');
  logbookId: number = +this.route.snapshot.paramMap.get('logbookId');

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
    this.updateLogBookForm = this.formBuilder.group({
      tellerNo: [{ value: '', disabled: true }, Validators.required],
      dateTime: ['', Validators.required],
      problem: ['', Validators.required],
      solution: ['', Validators.required]
    });
  }

  get f() {
    return this.updateLogBookForm.controls;
  }

  updateForm() {
    this.subscription = forkJoin(
      this.logbookService.findTellerById(this.tellerId),
      this.logbookService.findById(this.logbookId)
      ).subscribe(result => {
      this.updateLogBookForm.patchValue({
        tellerNo: result[0].tellerNo,
        dateTime: setFormDateThai(result[1].dateTime),
        problem: result[1].problem,
        solution: result[1].solution
      });
    });
  }

  saveForm(form: any) {
    this.isNextForm = true;

    if (form.invalid) {
      return false;
    }

    this.logbookService.setUpdateLogbook(this.updateLogBookForm.value, this.userService.getUsername(), this.tellerId, this.logbookId);
    return true;
  }

  save() {
    if (this.saveForm(this.updateLogBookForm)) {
      this.subscription = this.logbookService.updateLogBook().subscribe(result => {
        if (result) {
          this.logbookService.clear();
          this.router.navigate(['/logbook/search', this.tellerId]);
        }
      });
    }
  }

}
