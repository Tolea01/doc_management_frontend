import { DocumentStatus } from '@enums/document-status.enum';

export default function getDocumentBadgeVariant(status: DocumentStatus) {
  switch (status) {
    case DocumentStatus.IN_WORK:
      return 'warning';
    case DocumentStatus.EXPIRED:
      return 'danger';
    case DocumentStatus.EXPIRING:
      return 'info';
    case DocumentStatus.FINISHED:
      return 'success';
    default:
      return 'default';
  }
}
