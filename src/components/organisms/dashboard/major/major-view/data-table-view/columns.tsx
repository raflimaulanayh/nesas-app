/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Major } from 'types/data/major'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/ui/avatar'
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
    accessorKey: 'short_name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
    cell: ({ row }) => {
      const short_name: string = row.getValue('short_name')
      const long_name: string = row.getValue('long_name')

      return (
        <div>
          {long_name} {`(${short_name})`}
        </div>
      )
    }
  },
  {
    accessorKey: 'logo',
    header: 'Logo',
    cell: ({ row }) => {
      const logo: string = row.getValue('logo')
      const short_name: string = row.getValue('short_name')

      if (short_name) {
        return (
          <Avatar className="w-10 h-10">
            <AvatarImage src={logo} alt="Avatar" />
            <AvatarFallback>{short_name?.slice(0, 4)}</AvatarFallback>
          </Avatar>
        )
      }
    }
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
    cell: ({ row }) => <div className="max-w-52">{row.getValue('description') || '-'}</div>
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions endpoint="/majors" row={row} />
  }
]
