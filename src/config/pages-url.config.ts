export default class DASHBOARD_PAGES {
  userRole?: string;
  private root: string = '/management';
  HOME: string;

  constructor(userRole?: string) {
    this.userRole = userRole;
    this.HOME = `${this.root}/${this.userRole}/dashboard`;
  }
}
