/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ReactNode } from 'react'
import useSWR from 'swr'
import { Student } from 'types/data/student'
import { User } from 'types/data/user'

import { Checkbox } from '@/components/atoms/ui/checkbox'
import { DataTableColumnHeader } from '@/components/molecules/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/molecules/data-table/data-table-row-actions'

import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils/format-date'
import { formatInternshipStatus } from '@/lib/utils/format-internship-status'

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
    accessorKey: 'companyInternships',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Perusahaan" />,
    cell: ({ row }) => {
      const value: { name: string } = row.getValue('companyInternships')

      console.log('company', value)

      return <div>{value?.name ?? '-'}</div>
    },
    enableHiding: false
  },
  {
    accessorKey: 'students',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Daftar siswa" />,
    cell: ({ row }) => {
      const value: Student[] = row.getValue('students')
      const { data: classes } = useSWR('/classes')

      const filterClass = (class_id: string): ReactNode => {
        const dataClass = classes?.data?.find((item: { id: string }) => item.id === class_id)

        return dataClass ? dataClass.name : '-'
      }

      return (
        <ul className="pl-4 list-decimal">
          {value?.map((item) => (
            <li key={item?.id}>
              {item?.name} - {filterClass(item?.class_id ?? '-')}
            </li>
          ))}
        </ul>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: (row, status, value) => {
      return value.includes(row.getValue(status))
    },
    cell: ({ row }) => {
      const status: 'not_started' | 'pending' | 'approved' | 'rejected' | 'canceled' | 'ongoing' | 'completed' =
        row.getValue('status')
      const format = formatInternshipStatus(status)

      return <div className={cn(format.customCSS, 'p-2 rounded-md text-sm font-medium inline')}>{format.statusShow}</div>
    }
  },
  {
    accessorKey: 'start_date',
    header: 'Tanggal mulai',
    cell: ({ row }) => {
      const value: string = row.getValue('start_date')
      const format = value ? formatDate(value) : '-'

      return <div>{format}</div>
    }
  },
  {
    accessorKey: 'end_date',
    header: 'Tanggal berakhir',
    cell: ({ row }) => {
      const value: string = row.getValue('end_date')
      const format = value ? formatDate(value) : '-'

      return <div>{format}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions detailAble endpoint="/internships/companies" row={row} />
  }
]
