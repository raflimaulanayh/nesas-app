/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import useSWR from 'swr'
import { User } from 'types/data/user'

import { Checkbox } from '@/components/atoms/ui/checkbox'
import { DataTableColumnHeader } from '@/components/molecules/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/molecules/data-table/data-table-row-actions'

import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils/format-date'
import { formatGraduateStatus } from '@/lib/utils/format-graduate-status/format-graduate-status'

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
    accessorKey: 'nis',
    header: 'NIS',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('nis')}</div>
  },
  {
    accessorKey: 'nisn',
    header: 'NISN',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('nisn')}</div>
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'class_id',
    filterFn: (row, class_id, value) => {
      return value.includes(row.getValue(class_id))
    },
    header: 'Kelas',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const class_id = row.getValue('class_id')
      const { data: classes } = useSWR('/classes')

      const value = classes?.data?.find((item: { id: string }) => item?.id == class_id)

      return <div>{value?.name ?? '-'}</div>
    }
  },
  {
    accessorKey: 'gender',
    header: 'Jenis Kelamin',
    filterFn: (row, gender, value) => {
      return value.includes(row.getValue(gender))
    },
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
    enableSorting: false,
    enableHiding: false,
    header: 'No. HP',
    cell: ({ row }) => <div>{row.getValue('phone_number')}</div>
  },
  {
    accessorKey: 'phone_number_parent',
    enableSorting: false,
    enableHiding: false,
    header: 'No. HP orang tua / wali',
    cell: ({ row }) => <div>{row.getValue('phone_number_parent')}</div>
  },
  {
    accessorKey: 'address',
    header: 'Alamat',
    cell: ({ row }) => <div className="max-w-xs">{row.getValue('address')}</div>
  },
  {
    accessorKey: 'graduate_status',
    header: 'Status sekolah',
    filterFn: (row, graduate_status, value) => {
      return value.includes(row.getValue(graduate_status))
    },
    cell: ({ row }) => {
      const status: 'ongoing' | 'graduated' | 'dropout' | 'transferred' = row.getValue('graduate_status')
      const format = formatGraduateStatus(status)

      return <div className={cn(format.customCSS, 'p-2 rounded-md text-sm font-medium inline')}>{format.statusShow}</div>
    }
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
    cell: ({ row }) => <DataTableRowActions detailAble endpoint="/student" row={row} />
  }
]
