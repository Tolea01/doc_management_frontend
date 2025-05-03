'use client';

import BarChartComponent from '@components/diagrams/BarChart';
import { entryDocumentService } from '@services/entry-document/entry-document.service';
import { exitDocumentService } from '@services/exit-document/exit-document.service';
import { internalDocumentService } from '@services/internal-document/internal-document.service';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../../hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: entryDoc, isLoading: entryDocLoad } = useQuery({
    queryKey: ['entryDocuments'],
    queryFn: () => entryDocumentService.getByCoordinator(user?.userId),
  });

  const { data: internalDoc, isLoading: internalDocLoad } = useQuery({
    queryKey: ['internalDocuments'],
    queryFn: () => internalDocumentService.getByCoordinator(user?.userId),
  });

  const { data: exitDoc, isLoading: exitDocLoad } = useQuery({
    queryKey: ['exitDocuments'],
    queryFn: () => exitDocumentService.getByExecutor(user?.userId),
  });

  console.log(exitDoc?.data.length)

  const diagramData = [
    { name: 'Documente de intrare', valoarea: entryDoc?.data.length },
    { name: 'Documente de ieșire', valoarea: exitDoc?.data.length },
    { name: 'Documente interne', valoarea: internalDoc?.data.length },
  ];

  if (internalDocLoad && exitDocLoad && entryDocLoad) return null;

  return (
    <div>
      <h1 className="text-lg mb-5">Documente în executare</h1>
      <BarChartComponent data={diagramData} />
    </div>
  );
}
