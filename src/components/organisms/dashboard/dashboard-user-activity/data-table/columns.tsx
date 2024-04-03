/* eslint-disable import-helpers/order-imports */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { UserActivity } from 'types/data/user-activity'

import { Checkbox } from '@/components/atoms/ui/checkbox'

// import { DataTableRowActions } from "@/components/common/data-table/data-table-row-actions"
import { DataTableColumnHeader } from '@/components/molecules/data-table/data-table-column-header'

import { cn } from '@/lib/utils'

interface UserActivies extends UserActivity {
  id: string
}

export const columns: ColumnDef<UserActivies>[] = [
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
    accessorKey: 'identifier',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Identifier" />,
    cell: ({ row }) => {
      const value: string = row.getValue('identifier')

      return <div>{value ?? '-'}</div>
    }
  },
  {
    accessorKey: 'type_activity',
    filterFn: (row, type_activity, value) => {
      return value.includes(row.getValue(type_activity))
    },
    header: 'Tipe Aktivitas',
    cell: ({ row }) => {
      const value: string = row.getValue('type_activity')
      let colorStatus: string

      switch (value) {
        case 'create':
        case 'signin':
          colorStatus = 'text-green-500 bg-green-50'
          break
        case 'update':
          colorStatus = 'text-blue-500 bg-blue-50'
          break
        case 'delete':
        case 'signout':
          colorStatus = 'text-red-500 bg-red-50'
          break
        default:
          colorStatus = 'text-gray-500 bg-gray-50'
      }

      return <div className={cn('capitalize rounded p-2 inline', colorStatus)}>{value}</div>
    }
  },
  {
    accessorKey: 'activity_detail',
    header: 'Detail Aktivitas',
    cell: ({ row }) => {
      const value: string = row.getValue('activity_detail')

      return <div className="capitalize max-w-40">{value ?? '-'}</div>
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Tanggal Aktivitas',
    cell: ({ row }) => {
      const value: string = row.getValue('createdAt') ?? '2024-02-25T13:26:30.125Z'
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }
      const UserActivityDate = value ? new Date(value).toLocaleDateString('id-ID', options) : '-'

      return <div>{UserActivityDate ?? '-'}</div>
    }
  }
  // {
  //     id: "actions",
  //     cell: ({ row }) => <DataTableRowActions endpoint="/api/UserActivies" row={row} />,
  // }
]
