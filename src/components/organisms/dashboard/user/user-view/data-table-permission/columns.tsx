/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { mutate } from 'swr'
import { User } from 'types/data/user'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/ui/avatar'
import { Checkbox } from '@/components/atoms/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/ui/popover'
import { ToastAction } from '@/components/atoms/ui/toast'
import { toast } from '@/components/atoms/ui/use-toast'
import { DataTableColumnHeader } from '@/components/molecules/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/molecules/data-table/data-table-row-actions'

import { updateStatusUser } from '@/lib/utils/actions/update-status-user'

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
    accessorKey: 'active',
    header: 'Status',
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = row.original

      async function onSubmitStatus(approved: boolean) {
        const body = {
          id: data?.id,
          email: data?.email,
          role: data?.role,
          data_id: data?.role === 'teacher' ? data?.teachers[0]?.id : data?.students[0]?.id
        }

        try {
          const response = await updateStatusUser(body, approved)
          if (response?.success) {
            toast({
              title: response.success
            })
            mutate('/users')
            console.log(response.success)
          } else {
            toast({
              title: response?.error,
              variant: 'destructive'
            })
            console.error(response.error)
          }
        } catch (error) {
          console.error(error)
        }
      }

      const handleUpdate = (approved: boolean) => {
        toast({
          variant: 'destructive',
          title: 'Update data',
          description: approved ? 'Anda yakin ingin menyetujui data ini?' : 'Anda yakin ingin menolak data ini?',
          action: (
            <ToastAction onClick={() => onSubmitStatus(approved)} altText="Try again">
              Ya
            </ToastAction>
          )
        })
      }

      return (
        <Popover>
          <PopoverTrigger>
            <div
              className={`inline px-4 py-2 border-2 border-white rounded hover:border-red-500 hover:bg-red-100 ${row.getValue('active') === false ? 'text-red-500 border-red-500 bg-red-50' : ''}`}
            >
              {row.getValue('active') === false ? 'Meminta perizinan' : row.getValue('active')}
            </div>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="flex flex-col -m-2 space-y-2 text-sm font-medium">
              <button
                onClick={() => handleUpdate(true)}
                aria-label="Status Action Approve"
                className="inline px-3 py-1.5 text-white bg-green-600 rounded"
              >
                Setujui
              </button>
              <button
                onClick={() => handleUpdate(false)}
                aria-label="Status Action Reject"
                className="inline px-3 py-1.5 text-white bg-red-600 rounded"
              >
                Tolak
              </button>
            </div>
          </PopoverContent>
        </Popover>
      )
    }
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
    cell: ({ row }) => <DataTableRowActions detailAble editAble={false} endpoint="/users" row={row} />
  }
]
