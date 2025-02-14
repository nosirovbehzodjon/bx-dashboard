import { ColumnDef } from '@tanstack/react-table';

import { useProfileList } from './useProfileList';
import { DataTable } from '@/components/Table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

import { IProfileItem } from '@/types/profile.types';

const columns: ColumnDef<IProfileItem>[] = [
  {
    accessorKey: 'avatar',
    accessorFn: row => row.avatar,
    cell: ({ row: { original } }) => {
      if (original.avatar) {
        const avatar: string = import.meta.env.VITE_API_PROFILE_IMAGE_URL + original.avatar;
        return (
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={avatar} alt={original.fullname || 'Full name'} />
            <AvatarFallback className="rounded-lg">{original.fullname?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        );
      }
      return null;
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
      if (original.role === 'owner') {
        return (
          <Badge variant="default" className="bg-green-600 min-w-16 justify-center">
            {original.role}
          </Badge>
        );
      }
      if (original.role === 'admin') {
        return (
          <Badge variant="default" className="bg-orange-600 min-w-16 justify-center">
            {original.role}
          </Badge>
        );
      }
      return (
        <Badge variant="default" className="bg-red-600 min-w-16 justify-center">
          {original.role}
        </Badge>
      );
    },
    header: () => 'Role',
  },
  {
    accessorKey: 'created_at',
    accessorFn: row => row.email,
    cell: ({ row: { original } }) => {
      return format(original.created_at, 'PPP');
    },
    header: () => 'Created',
  },
  {
    accessorKey: 'updated_at',
    accessorFn: row => row.updated_at,
    cell: ({ row: { original } }) => {
      return format(original.updated_at, 'PPP');
    },
    header: () => 'Updated',
  },
];

export const ProfileTableList = () => {
  const { data = [] } = useProfileList();

  return <DataTable data={data} columns={columns} />;
};
