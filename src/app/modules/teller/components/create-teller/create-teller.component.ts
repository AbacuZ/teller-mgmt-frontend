import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { DropdownService } from '@app/core';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-create-teller',
  templateUrl: './create-teller.component.html',
  styleUrls: ['./create-teller.component.css']
})
export class CreateTellerComponent implements OnInit, OnDestroy {

  createTellerForm: FormGroup;
  subscription: Subscription;
  isNextForm: Boolean = false;
  versions: any[];
  brands: any[];
  districts: any[];
  provinces: any[];
  typeTellers: any[];
  zones: any[];
  typeAddresses: any[];

  constructor(private formBuilder: FormBuilder,
    private dropdownService: DropdownService) { }

  ngOnInit() {
    this.getDropdownData();
    this.initForm();
  }

  ngOnDestroy() {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }

  getDropdownData() {
    this.subscription = forkJoin(
      this.dropdownService.finAllVersion(),
      this.dropdownService.findAllBrand(),
      this.dropdownService.findAllDistrict(),
      this.dropdownService.findAllProvince(),
      this.dropdownService.findAllTypeTeller(),
      this.dropdownService.findAllZone(),
      this.dropdownService.findAllTypeAddress()
    ).subscribe(result => {
      this.versions = result[0];
      this.brands = result[1];
      this.districts = result[2];
      this.provinces = result[3];
      this.typeTellers = result[4];
      this.zones = result[5];
      this.typeAddresses = result[6];
    });
  }

  initForm() {
    this.createTellerForm = this.formBuilder.group({
      tellerNo: ['', Validators.required],
      tellerAddress: [''],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      serial: [''],
      telTellerAddress: [''],
      branch: [''],
      gprsCompany: [''],
      ipAddress: ['', Validators.required],
      ipGateway: ['', Validators.required],
      servicePort: ['', Validators.required],
      localPort: ['', Validators.required],
      indexMasterKey: ['', Validators.required],
      zoneId: ['', Validators.required],
      provinceId: ['', Validators.required],
      districtId: ['', Validators.required],
      versionTellerId: ['', Validators.required],
      brandTellerId: ['', Validators.required],
      typeTellerId: ['', Validators.required],
      typeAddressId: ['', Validators.required]
    });
  }

  get f() {
    return this.createTellerForm.controls;
  }

  clearForm() {
    this.isNextForm = false;
    this.createTellerForm.reset();
    this.initForm();
  }

  saveForm(form: any) {
    this.isNextForm = true;

    if (form.invalid) {
      return false;
    }

    return true;
  }

  save() {
    if (this.saveForm(this.createTellerForm)) {
    }
  }

}
