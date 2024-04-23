/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { User } from 'types/data/user'

import { Checkbox } from '@/components/atoms/ui/checkbox'
import { DataTableColumnHeader } from '@/components/molecules/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/molecules/data-table/data-table-row-actions'

import { cn } from '@/lib/utils'
import { formatCompanyStatus } from '@/lib/utils/format-company-status'

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
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    enableHiding: false
  },
  {
    accessorKey: 'address',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Alamat" />,
    cell: ({ row }) => <div>{row.getValue('address')}</div>,
    enableHiding: false
  },
  {
    accessorKey: 'contact',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kontak" />,
    cell: ({ row }) => {
      const value: string = row.getValue('contact')
      const splitData = value ? value?.split(',').map((item) => item.trim()) : ([{}] as string[])

      return (
        <ul className="pl-4 list-decimal">
          {splitData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )
    },
    enableHiding: false
  },
  {
    accessorKey: 'quota',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kuota" />,
    cell: ({ row }) => <div>{row.getValue('quota')}</div>,
    enableHiding: false
  },
  {
    accessorKey: 'requirements',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Persyaratan" />,
    cell: ({ row }) => {
      const value: string = row.getValue('requirements')
      const splitData = value ? value?.split(',').map((item) => item.trim()) : ([{}] as string[])

      return (
        <ul className="pl-4 list-decimal">
          {splitData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )
    },
    enableHiding: false
  },
  {
    accessorKey: 'majors',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Daftar Jurusan" />,
    cell: ({ row }) => {
      const value: any[] = row.getValue('majors')

      return <ul className="pl-4 list-decimal">{value?.map((item) => <li key={item?.id}>{item?.short_name}</li>)}</ul>
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'leader_name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pimpinan" />,
    cell: ({ row }) => <div>{row.getValue('leader_name')}</div>,
    enableHiding: false
  },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: (row, status, value) => {
      return value.includes(row.getValue(status))
    },
    cell: ({ row }) => {
      const status: 'active' | 'not_active' | 'pending' | 'filled' = row.getValue('status')
      const format = formatCompanyStatus(status)

      return <div className={cn(format.customCSS, 'p-2 rounded-md text-sm font-medium inline')}>{format.statusShow}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        detailAble
        urlDetail="/dashboard/internship/company"
        endpoint="/internships/companies"
        row={row}
      />
    )
  }
]
