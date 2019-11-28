import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownService, SearchService } from '@app/core';
import { Subscription } from 'rxjs/Subscription';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  subscription: Subscription;
  isNextForm: Boolean = false;
  versions: any[];
  brands: any[];
  districts: any[];
  provinces: any[];
  typeTellers: any[];
  zones: any[];
  addressTypes: any[];
  rowDatas: any[];
  lat = 13.737068;
  lng = 100.5408151;
  tellerActive: any;
  tellerDetailsActive: any;
  districtActive: any;
  provinceActive: any;
  zoneActive: any;
  latitude = 13.737068;
  longitude = 100.5408151;
  markers: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private searchService: SearchService,
    private router: Router) { }

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
      this.dropdownService.findAllTypeAddress(),
      this.dropdownService.findAllDistrict(),
      this.dropdownService.findAllProvince(),
      this.dropdownService.findAllZone()
    ).subscribe(result => {
      this.versions = result[0];
      this.addressTypes = result[1];
      this.districts = result[2];
      this.provinces = result[3];
      this.zones = result[4];
    });
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      tellerAddress: ['', Validators.required],
      zone: [''],
      province: [''],
      district: [''],
      addressType: [''],
      versionTeller: ['']
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  clear() {
    this.isNextForm = false;
    this.searchForm.reset();
    this.initForm();
    this.searchService.clearResult();
  }

  saveForm(form: any) {
    this.isNextForm = true;

    if (form.invalid) {
      return false;
    }

    this.searchService.setSearchCriteria(this.searchForm.value);
    return true;
  }

  find() {
    if (this.saveForm(this.searchForm)) {
      this.subscription = this.searchService.findMap().subscribe(async result => {
        this.markers = [];
        this.searchService.clearResult();
        this.searchService.setResult(result);
        this.setMarkers(result);
        this.rowDatas = this.searchService.getResult();
      });
    }
  }

  onClickTellerAddress(tellerId: any, tellerDetailsId: any) {
    this.subscription = this.searchService.findTellerDetailsById(tellerDetailsId).subscribe(async result => {
      this.tellerActive = this.rowDatas.find(res => res.tellerId === tellerId);
      this.districtActive = this.districts.find(res => res.districtId === this.tellerActive.districtId);
      this.provinceActive = this.provinces.find(res => res.provinceId === this.tellerActive.provinceId);
      this.zoneActive = this.zones.find(res => res.zoneId === this.tellerActive.zoneId);
      this.tellerDetailsActive = result;
      this.latitude = +this.tellerActive.latitude;
      this.longitude = +this.tellerActive.longitude;
    });
  }

  logbook(id: any) {
    $('.psn-close').click();
    this.router.navigate(['/logbook/search', id]);
  }

  setMarkers(data: any[]) {
    data.forEach(res => {
      this.markers.push({
        lat: +res.latitude,
        lng: +res.longitude,
        label: {
          color: '#CC0000',
          fontSize: '14px',
          fontWeight: 'bold',
          text: res.tellerAddress
        }
      });
    });
  }

}
