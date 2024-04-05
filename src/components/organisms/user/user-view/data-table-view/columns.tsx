/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { User } from 'types/data/user'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/ui/avatar'
import { Checkbox } from '@/components/atoms/ui/checkbox'
import { DataTableColumnHeader } from '@/components/molecules/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/molecules/data-table/data-table-row-actions'

interface Users extends User {
  id: string
}

export const columns: ColumnDef<Users>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'username',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
    cell: ({ row }) => <div>{row.getValue('username')}</div>,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <div>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'role',
    filterFn: (row, role, value) => {
      return value.includes(row.getValue(role))
    },
    header: 'Role',
    cell: ({ row }) => <div className="uppercase">{row.getValue('role')}</div>
  },
  {
    accessorKey: 'photo',
    header: 'Foto',
    cell: ({ row }) => {
      const photo: string = row.getValue('photo')

      return (
        <Avatar className="w-10 h-10">
          <AvatarImage src={photo} alt="Avatar" />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions detailAble endpoint="/users" row={row} />
  }
]
