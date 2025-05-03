'use client';

import BarChartComponent from '@components/diagrams/BarChart';
import { entryDocumentService } from '@services/entry-document/entry-document.service';
import { exitDocumentService } from '@services/exit-document/exit-document.service';
import { internalDocumentService } from '@services/internal-document/internal-document.service';
import { useQuery } from '@tanstack/react-query';

export default function DashboardPage() {
  const { data: entryDoc, isLoading: entryDocLoad } = useQuery({
    queryKey: ['entryDocuments'],
    queryFn: () => entryDocumentService.getAll(),
  });

  const { data: internalDoc, isLoading: internalDocLoad } = useQuery({
    queryKey: ['internalDocuments'],
    queryFn: () => internalDocumentService.getAll(),
  });

  const { data: exitDoc, isLoading: exitDocLoad } = useQuery({
    queryKey: ['exitDocuments'],
    queryFn: () => exitDocumentService.getAll(),
  });

  const diagramData = [
    { name: 'Documente de intrare', valoarea: entryDoc?.data?.data.length },
    { name: 'Documente de ieșire', valoarea: exitDoc?.data?.data.length },
    { name: 'Documente interne', valoarea: internalDoc?.data?.data.length },
  ];

  if (internalDocLoad && exitDocLoad && entryDocLoad) return null;

  return (
    <div>
      <h1 className="text-lg mb-5">Documente în lucru</h1>
      <BarChartComponent data={diagramData} />
    </div>
  );
}
