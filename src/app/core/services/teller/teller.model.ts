export class Teller {
  tellerId: Number = 0;
  tellerNo: String = '';
  tellerAddress: String = '';
  latitude: String = '';
  longitude: String = '';
  serial: String = '';
  telTellerAddress: String = '';
  branch: String = '';
  gprsCompany: String = '';
  ipAddress: String = '';
  ipGateway: String = '';
  servicePort: String = '';
  localPort: String = '';
  indexMasterKey: String = '';
  zoneId: String = '';
  provinceId: String = '';
  districtId: String = '';
  versionTellerId: String = '';
  brandTellerId: String = '';
  typeTellerId: String = '';
  typeAddressId: String = '';
  Clear() {
    this.tellerId = 0;
    this.tellerNo = '';
    this.tellerAddress = '';
    this.latitude = '';
    this.longitude = '';
    this.serial = '';
    this.telTellerAddress = '';
    this.branch = '';
    this.gprsCompany = '';
    this.ipAddress = '';
    this.ipGateway = '';
    this.servicePort = '';
    this.localPort = '';
    this.indexMasterKey = '';
    this.zoneId = '';
    this.provinceId = '';
    this.districtId = '';
    this.versionTellerId = '';
    this.brandTellerId = '';
    this.typeTellerId = '';
    this.typeAddressId = '';
  }
}
