import { UserRole } from '@enums/user-role.enum'

export default class DASHBOARD_PAGES {
  userRole?: UserRole;
  private root: string = '/management';
  HOME: string;

  constructor(userRole?: UserRole) {
    this.userRole = userRole;
    this.HOME = `${this.root}/${this.userRole}/dashboard`;
  }
}
