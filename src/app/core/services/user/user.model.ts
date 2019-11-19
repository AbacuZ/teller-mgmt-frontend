export class User {
  email: String = '';
  firstname: String = '';
  lastname: String = '';
  password: String = '';
  position: String = '';
  roleId: Number = 0;
  telephone: String = '';
  username: String = '';
  Clear() {
    this.email = '';
    this.firstname = '';
    this.lastname = '';
    this.password = '';
    this.position = '';
    this.roleId = 0;
    this.telephone = '';
    this.username = '';
  }
}
