export class LogBook {
  logBookId: Number = 0;
  dateTime: String = '';
  problem: String = '';
  solution: String = '';
  tellerId: Number = 0;
  username: String = '';
  Clear() {
    this.logBookId = 0;
    this.dateTime = '';
    this.problem = '';
    this.solution = '';
    this.tellerId = 0;
    this.username = '';
  }
}
