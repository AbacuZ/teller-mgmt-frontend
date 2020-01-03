import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownService, SearchService, ExportExcelService } from '@app/core';
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
  districtsInitial: any[];
  provinces: any[];
  typeTellers: any[];
  zones: any[];
  addressTypes: any[];
  rowDatas: any[] = [];
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
  iconUrl: any = {
    url: 'assets/images/pin.svg',
    scaledSize: {
      width: 30,
      height: 40
    }
  };
  currentLat = 0;
  currentLng = 0;
  googleURI: any;
  lastSelectedInfoWindow: any;

  constructor(private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private searchService: SearchService,
    private router: Router,
    private exportExcelService: ExportExcelService) { }

  ngOnInit() {
    this.getDropdownData();
    this.initForm();
    this.setCurrentLocation();
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
      this.dropdownService.findAllZone(),
      this.dropdownService.findAllTypeTeller()
    ).subscribe(result => {
      this.versions = result[0];
      this.brands = result[1];
      this.districts = result[2];
      this.districtsInitial = result[2];
      this.provinces = result[3].sort((a: any, b: any) => a.provinceNameThai < b.provinceNameThai ? -1 : 1);
      this.zones = result[4];
      this.typeTellers = result[5];
    });
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      tellerAddress: [''],
      zone: [''],
      province: [''],
      district: [''],
      versionTeller: [''],
      brandTellerId: [''],
      typeTellerId: ['']
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  onChangeProvince(event: any) {
    this.searchForm.controls['district'].setValue('');
    if (event.target.value) {
      this.districts = this.districtsInitial
        .filter(res => +res.provinceId === +event.target.value)
        .sort((a: any, b: any) => a.districtNameThai < b.districtNameThai ? -1 : 1);
    } else {
      this.districts = this.districtsInitial;
    }
  }

  clear() {
    this.isNextForm = false;
    this.markers = [];
    this.rowDatas = [];
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
        this.rowDatas = [];
        this.rowDatas = this.searchService.getResult();
      });
    }
  }

  findLocation() {
    this.subscription = this.searchService.findNearestLocation(this.currentLat, this.currentLng).subscribe(async result => {
      this.markers = [];
      this.searchService.clearResult();
      this.searchService.setResult(result);
      this.setMarkers(result);
      this.rowDatas = this.searchService.getResult();
    });
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
      this.setGoogleURI(this.tellerActive.latitude, this.tellerActive.longitude);
    });
  }

  logbook(id: any) {
    $('.psn-close').click();
    this.router.navigate(['/logbook/search', id]);
  }

  setMarkers(data: any[]) {
    data.forEach(res => {
      this.markers.push({
        tellerNo: res.tellerNo,
        tellerAddress: res.tellerAddress,
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

  report() {
    this.subscription = this.searchService.findAll().subscribe(async result => {
      this.exportExcelService.exportAsExcelFile(result, 'data_teller');
    });
  }

  markerClick(infoWindow: any) {
    if (infoWindow === this.lastSelectedInfoWindow) {
      return;
    }
    if (this.lastSelectedInfoWindow != null) {
      try {
        this.lastSelectedInfoWindow.close();
      } catch { }
    }
    this.lastSelectedInfoWindow = infoWindow;
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLng = position.coords.longitude;
      });
    }
  }

  private setGoogleURI(lat: any, lng: any) {
    if (lat && lng) {
      this.googleURI = 'https://www.google.com/maps/place/' + lat + ',' + lng;
    } else {
      this.googleURI = 'https://www.google.com/maps';
    }
  }
}
