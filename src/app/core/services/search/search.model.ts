export class SearchCriteria {
  districtId: Number = 0;
  provinceId: Number = 0;
  tellerAddress: String = '';
  typeAddressId: Number = 0;
  versionTellerId: Number = 0;
  zoneId: Number = 0;
  Clear() {
    this.districtId = 0;
    this.provinceId = 0;
    this.tellerAddress = '';
    this.typeAddressId = 0;
    this.versionTellerId = 0;
    this.zoneId = 0;
  }
}
