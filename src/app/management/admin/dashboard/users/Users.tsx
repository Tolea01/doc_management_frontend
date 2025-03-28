'use client';

import Button from '@components/buttons/Button';
import InputField from '@components/fields/InputField';
import SelectInputField from '@components/fields/SelectInputField';
import Pagination from '@components/pagination/Pagination';
import Table from '@components/tables/Table';
import { entryDocumentService } from '@services/entry-document/entry-document.service';
import { userService } from '@services/user/user.service';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdNoteAdd } from 'react-icons/md';
import { toast } from 'sonner';
import getUserRoleOptions from '../../../../../utils/getUserRole';
import { roleLabels } from '../../../../../utils/getUserRole';
import { UserRole } from '@enums/user-role.enum'

export default function Users() {
  const { control, watch } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const selectOptions = getUserRoleOptions();
  const searchFilters = watch();
  const router: AppRouterInstance = useRouter();

  const filters = useMemo(() => {
    return Object.fromEntries(
      Object.entries(searchFilters || {})
        .filter(([_, value]) => value !== null && value !== '' && value !== undefined)
        .map(([key, value]) => {
          if (key === 'role' && value?.label) {
            return [key, value.value];
          }
          if (value instanceof Date) {
            return [key, format(value, 'yyyy-MM-dd')];
          }
          return [key, value];
        }),
    );
  }, [searchFilters]);

  const { data, isLoading } = useQuery({
    queryKey: ['users', currentPage, filters],
    queryFn: () => userService.getAll(currentPage, itemsPerPage, filters),
  });

  const totalItems: any = data?.data?.total || 0;
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Nume', key: 'name' },
    { label: 'Prenume', key: 'surname' },
    { label: 'Rol', key: 'role' },
    { label: 'Număr de telefon', key: 'phone_number' },
    { label: 'Adresa email', key: 'email_address' },
  ];

  const onDelete = async (id: any) => {
    try {
      await entryDocumentService.delete(id);
      window.location.reload();
    } catch (error) {
      toast.error('Eroare la ștergerea utilizatorului');
    }
  };

const tableData = data?.data.data
  .filter((user: any) => user.role !== UserRole.ALL)
  .map((user: any) => ({
    id: user.id,
    name: user.name,
    surname: user.surname,
    role: roleLabels[user.role as UserRole] || user.role,
    phone_number: user.phone_number,
    email_address: user.email_address,
  }));

	return (
		<section>
			<header className="page-header">
				<h1 className="page-title">Utilizatori</h1>
			</header>
			<form className="search-document-form">
				<div className="mb-4 lg:mb-0">
					<InputField
						name="name"
						label="Caută utilizatorul"
						control={control}
						id="user-search"
						type="search"
						className="w-full"
						size="medium"
						placeholder={'Introdu numele utilizatorului'}
					/>
				</div>
				<div className="search-document-selector">
					<Button
						size="small"
						variant="primary"
						value={
							<>
								adaugă <MdNoteAdd size={15} />
							</>
						}
						onClick={() => router.push('users/create')}
					/>
					<SelectInputField
						options={selectOptions}
						className="w-full"
						control={control}
						name="role"
						id="user-role-select"
						placeholder={'Caută după rol'}
					/>
				</div>
			</form>
			<article>
				<Table
					columns={columns}
					data={tableData}
					onModify={(id) => router.push(`users/update/${id}`)}
					onDelete={(id) => onDelete(id)}
				/>
				<div className="pt-5 pb-5">
					{Array.isArray(tableData) && tableData.length > 0 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={(page) => setCurrentPage(page)}
						/>
					)}
				</div>
			</article>
		</section>
	);
}
