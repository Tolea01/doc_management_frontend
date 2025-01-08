import { UserRole } from '@enums/user-role.enum';

export default class DASHBOARD_PAGES {
  userRole?: UserRole;
  private root: string = '/management';
  HOME: string;
  ENTRY_DOCUMENTS: string;
  EXIT_DOCUMENTS: string;
  INTERNAL_DOCUMENTS: string;
  USERS: string;
  PERSONS: string;
  SETTINGS: string;

  constructor(userRole?: UserRole) {
    this.userRole = userRole;
    this.HOME = `${this.root}/${this.userRole}/dashboard`;
    this.ENTRY_DOCUMENTS = `${this.root}/${this.userRole}/dashboard/entry-documents`;
    this.EXIT_DOCUMENTS = `${this.root}/${this.userRole}/dashboard/exit-documents`;
    this.INTERNAL_DOCUMENTS = `${this.root}/${this.userRole}/dashboard/internal-documents`;
    this.USERS = `${this.root}/${this.userRole}/dashboard/users`;
    this.PERSONS = `${this.root}/${this.userRole}/dashboard/persons`;
    this.SETTINGS = `${this.root}/${this.userRole}/dashboard/settings`;
  }
}
