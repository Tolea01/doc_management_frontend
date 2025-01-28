import { DocumentStatus } from '@enums/document-status.enum';

export default function getDocumentStatusOptions() {
  return Object.entries(DocumentStatus).map(([key, value]) => ({
    value: key,
    label: value,
  }));
}
