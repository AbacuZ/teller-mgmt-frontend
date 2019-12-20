import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownService, TellerService, ModalService } from '@app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-edit-teller',
  templateUrl: './edit-teller.component.html',
  styleUrls: ['./edit-teller.component.css']
})
export class EditTellerComponent implements OnInit, OnDestroy {

  updateTellerForm: FormGroup;
  subscription: Subscription;
  isNextForm: Boolean = false;
  versions: any[];
  brands: any[];
  districts: any[];
  districtsInitial: any[];
  provinces: any[];
  typeTellers: any[];
  zones: any[];
  typeAddresses: any[];
  idParams: number = +this.route.snapshot.paramMap.get('id');

  constructor(private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private tellerService: TellerService,
    private modalService: ModalService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDropdownData();
    this.initForm();
    this.findById(this.idParams);
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
    ).subscribe(async result => {
      this.versions = result[0];
      this.brands = result[1];
      this.districts = result[2];
      this.districtsInitial = result[2];
      this.provinces = result[3];
      this.typeTellers = result[4];
      this.zones = result[5];
      this.typeAddresses = result[6];
    });
  }

  initForm() {
    this.updateTellerForm = this.formBuilder.group({
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
    return this.updateTellerForm.controls;
  }

  findById(id: any) {
    this.subscription = this.tellerService.findById(id).subscribe(async result => {
      this.subscription = this.tellerService.findTellerDetailsById(result.tellerDetailsId).subscribe(async res => {
        this.tellerService.setTellerAndTellerDetails(result, res);
        const tel = this.tellerService.getTeller();
        const telDetails = this.tellerService.getTellerDetails();
        this.updateTellerForm.patchValue({
          tellerNo: tel.tellerNo,
          tellerAddress: tel.tellerAddress,
          latitude: tel.latitude,
          longitude: tel.longitude,
          serial: tel.serial,
          telTellerAddress: tel.telTellerAddress,
          branch: tel.branch,
          gprsCompany: tel.gprsCompany,
          ipAddress: telDetails.ipAddress,
          ipGateway: telDetails.ipGateway,
          servicePort: telDetails.servicePort,
          localPort: telDetails.localPort,
          indexMasterKey: telDetails.indexMasterKey,
          zoneId: tel.zoneId,
          provinceId: tel.provinceId,
          districtId: tel.districtId,
          versionTellerId: tel.versionTellerId,
          brandTellerId: tel.brandTellerId,
          typeTellerId: tel.typeTellerId,
          typeAddressId: tel.typeAddressId
        });
      });
    });
  }

  onVersionChange(event: any) {
    // if (event.target.value) {
    //   this.subscription = this.dropdownService.findVersionById(+event.target.value).subscribe(res => {
    //     this.updateTellerForm.controls['brandTellerId'].setValue(res.brandTellerId);
    //     this.updateTellerForm.controls['typeTellerId'].setValue(res.typeTellerId);
    //   });
    // } else {
    //   this.updateTellerForm.controls['brandTellerId'].setValue('');
    //   this.updateTellerForm.controls['typeTellerId'].setValue('');
    // }
  }

  onChangeProvince(event: any) {
    this.updateTellerForm.controls['districtId'].setValue('');
    if (event.target.value) {
      this.districts = this.districtsInitial.filter(res => +res.provinceId === +event.target.value);
    } else {
      this.districts = this.districtsInitial;
    }
  }

  clearForm() {
    this.isNextForm = false;
    this.updateTellerForm.reset();
    this.initForm();
  }

  saveForm(form: any) {
    this.isNextForm = true;

    if (form.invalid) {
      return false;
    }

    this.tellerService.setTeller(this.updateTellerForm.value);
    this.tellerService.setTellerDetails(this.updateTellerForm.value);
    return true;
  }

  save() {
    if (this.saveForm(this.updateTellerForm)) {
      this.subscription = this.tellerService.updateTeller().subscribe(result => {
        if (result) {
          this.tellerService.clear();
          this.modalService.setNormalStyle();
          this.modalService.setHeader('Teller');
          this.modalService.setContent('Update Teller Success');
          this.modalService.setRoute('/teller/search');
          this.modalService.open();
        }
      });
    }
  }

}
