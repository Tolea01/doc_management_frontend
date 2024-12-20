import { DocumentStatus } from '../enums/document-status.enum'

export interface IEntryDocument {
  id: number;
  created_by: number;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
  number: string;
  entry_number: string;
  date: string;
  entry_date: string;
  status: DocumentStatus;
  comment: string;
  resolution: string;
  execution_time: string;
  file_path: string;
}

export interface IInternalDocument {
  id: number;
  created_by: number;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
  number: string;
  date: string;
  status: DocumentStatus;
  comment: string;
  resolution: string;
  execution_time: string;
  file_path: string;
}

export interface IExitDocument {
  id: number;
  created_by: number;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
  number: string;
  date: string;
  comment: string;
  execution_time: string;
  file_path: string;
}