export class SearchCriteria {
  districtId: Number = 0;
  provinceId: Number = 0;
  tellerAddress: String = '';
  tellerNo: String = '';
  versionTellerId: Number = 0;
  typeTellerId: Number = 0;
  brandTellerId: Number = 0;
  zoneId: Number = 0;
  Clear() {
    this.districtId = 0;
    this.provinceId = 0;
    this.tellerAddress = '';
    this.tellerNo = '';
    this.versionTellerId = 0;
    this.typeTellerId = 0;
    this.brandTellerId = 0;
    this.zoneId = 0;
  }
}
