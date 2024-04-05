/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { User } from 'types/data/user'

import { Checkbox } from '@/components/atoms/ui/checkbox'
import { DataTableColumnHeader } from '@/components/molecules/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/molecules/data-table/data-table-row-actions'

import { formatDate } from '@/lib/utils/format-date'

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
    )
  },
  {
    accessorKey: 'nip',
    header: 'NIP',
    cell: ({ row }) => <div>{row.getValue('nip')}</div>
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'gender',
    header: 'Jenis Kelamin',
    cell: ({ row }) => {
      const value = row.getValue('gender')
      const customed = value && value === 'male' ? 'Laki-laki' : value === 'female' ? 'Perempuan' : '-'

      return <div>{customed}</div>
    }
  },
  {
    accessorKey: 'birth_date',
    header: 'Tanggal lahir',
    cell: ({ row }) => {
      const value: string = row.getValue('birth_date')
      const format = value ? formatDate(value) : '-'

      return <div>{format}</div>
    }
  },
  {
    accessorKey: 'phone_number',
    header: 'No. HP',
    cell: ({ row }) => <div>{row.getValue('phone_number')}</div>
  },
  {
    accessorKey: 'address',
    header: 'Alamat',
    cell: ({ row }) => <div className="max-w-xs">{row.getValue('address')}</div>
  },
  {
    accessorKey: 'join_date',
    header: 'Tanggal bergabung',
    cell: ({ row }) => {
      const value: string = row.getValue('join_date')
      const format = value ? formatDate(value) : '-'

      return <div>{format}</div>
    }
  },
  {
    accessorKey: 'end_date',
    header: 'Tanggal keluar',
    cell: ({ row }) => {
      const value: string = row.getValue('end_date')
      const format = value ? formatDate(value) : '-'

      return <div>{format}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions detailAble endpoint="/users" row={row} />
  }
]
