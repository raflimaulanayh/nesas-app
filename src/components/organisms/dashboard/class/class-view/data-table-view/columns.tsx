/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Major } from 'types/data/major'

import { Checkbox } from '@/components/atoms/ui/checkbox'
import { DataTableColumnHeader } from '@/components/molecules/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/molecules/data-table/data-table-row-actions'

interface Majors extends Major {
  id: string
}

export const columns: ColumnDef<Majors>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
    cell: ({ row }) => {
      const name: string = row.getValue('name')

      return <div>{name}</div>
    }
  },
  {
    accessorKey: 'major_id',
    filterFn: (row, major_id, value) => {
      return value.includes(row.getValue(major_id))
    },
    header: ({ column }) => <DataTableColumnHeader column={column} title="Jurusan" />,
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = row.original

      return <div>{data?.major?.short_name}</div>
    }
  },
  {
    accessorKey: 'students',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total siswa" />,
    cell: ({ row }) => {
      const total: [] = row.getValue('students')

      return <div>{total?.length || 0} Siswa</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions endpoint="/classes" row={row} />
  }
]
