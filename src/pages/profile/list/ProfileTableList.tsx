import { ColumnDef } from '@tanstack/react-table';

import { useProfileList } from './useProfileList';
import { DataTable } from '@/components/Table';

import { IProfileItem } from '@/types/profile.types';

const columns: ColumnDef<IProfileItem>[] = [
  {
    accessorKey: 'avatar',
    accessorFn: row => row.avatar,
    cell: ({ row: { original } }) => {
      return original.avatar;
    },
    header: () => 'Avatar',
  },
  {
    accessorKey: 'fullname',
    accessorFn: row => row.fullname,
    cell: ({ row: { original } }) => {
      return original.fullname;
    },
    header: () => 'Full name',
  },
  {
    accessorKey: 'email',
    accessorFn: row => row.email,
    cell: ({ row: { original } }) => {
      return original.email;
    },
    header: () => 'Email',
  },
  {
    accessorKey: 'role',
    accessorFn: row => row.role,
    cell: ({ row: { original } }) => {
      return original.role;
    },
    header: () => 'Role',
  },
];

export const ProfileTableList = () => {
  const { data = [] } = useProfileList();

  return <DataTable data={data} columns={columns} />;
};
