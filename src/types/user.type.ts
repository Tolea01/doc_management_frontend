import { UserRole } from '../enums/user-role.enum';
import { IEntryDocument, IExitDocument, IInternalDocument } from './document.types';

export interface IUser {
  id: number;
  name: string;
  surname: string;
  email_address: string;
  role: UserRole;
  photo: string;
  phone_number: string;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface IUserListResponse extends IUser {
  entry_documents_executors: IEntryDocument;
  entry_documents_coordinators: IEntryDocument;
  internal_documents_executors: IInternalDocument;
  internal_documents_coordinators: IInternalDocument;
  exit_documents_executors: IExitDocument;
}

export type IUserUpdate = Partial<
  Omit<IUser, 'id' | 'created_at' | 'updated_at' | 'updated_by' | 'created_by_'>
>;
