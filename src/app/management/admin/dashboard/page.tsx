'use client';

import { userService } from '@services/user/user.service';
import { useQuery } from '@tanstack/react-query';
import BarChartComponent from '@components/diagrams/BarChart';


export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  });

  const adminRole = data?.data.data.filter((user) => user.role === 'admin');
  const secretaryRole = data?.data.data.filter((user) => user.role === 'secretary');
  const directorRole = data?.data.data.filter((user) => user.role === 'director');
  const headOfDirectionRole = data?.data.data.filter(
    (user) => user.role === 'headOfDirection',
  );

  const diagramData = [
    { name: 'Administrator', valoarea: adminRole?.length },
    { name: 'Director', valoarea: directorRole?.length },
    { name: 'Secretar', valoarea: secretaryRole?.length },
    { name: 'Șef direcție', valoarea: headOfDirectionRole?.length },
  ];

  if (isLoading) return null;

  return (
    <div>
      <h1 className="text-lg mb-5">Utilizatori</h1>
      <BarChartComponent data={diagramData} />
    </div>
  );
}
