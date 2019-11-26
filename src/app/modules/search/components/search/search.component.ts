import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DropdownService } from '@app/core';
import { Subscription } from 'rxjs/Subscription';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  subscription: Subscription;
  versions: any[];
  brands: any[];
  districts: any[];
  provinces: any[];
  typeTellers: any[];
  zones: any[];
  addressTypes: any[];

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
      tellerAddress: [''],
      zone: [''],
      province: [''],
      district: [''],
      addressType: [''],
      versionTeller: ['']
    });
  }

}
