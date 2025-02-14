import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/Table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

import { INewsItem } from '@/types/news.types';

import { useNewsList } from '@/pages/news/list/useNewsList';

const columns: ColumnDef<INewsItem>[] = [
  {
    accessorKey: 'title',
    accessorFn: row => row.title,
    cell: ({ row: { original } }) => {
      return original.title;
    },
    header: () => 'Title',
  },
  {
    accessorKey: 'author',
    accessorFn: row => row.author,
    cell: ({ row: { original } }) => {
      if (original.author) {
        const avatar: string = import.meta.env.VITE_API_News_IMAGE_URL + original.author.avatar;
        return (
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={avatar} alt={original.author.fullname || 'Full name'} />
              <AvatarFallback className="rounded-lg">
                {original.author.fullname?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <p>{original.author.fullname}</p>
          </div>
        );
      }
      return null;
    },
    header: () => 'Author',
  },
  {
    accessorKey: 'created_at',
    accessorFn: row => row.created_at,
    cell: ({ row: { original } }) => {
      return format(original.created_at, 'PPPpp');
    },
    header: () => 'Created',
  },
  {
    accessorKey: 'updated_at',
    accessorFn: row => row.updated_at,
    cell: ({ row: { original } }) => {
      return format(original.updated_at, 'PPPpp');
    },
    header: () => 'Updated',
  },
];

export const NewsTableList = () => {
  const { data = [] } = useNewsList();

  return <DataTable data={data} columns={columns} />;
};
