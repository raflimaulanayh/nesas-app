/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import api from '@/services/api'
import { ColumnDef } from '@tanstack/react-table'
import { ReactNode } from 'react'
import useSWR, { mutate } from 'swr'
import { Student } from 'types/data/student'
import { User } from 'types/data/user'

import { Checkbox } from '@/components/atoms/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/ui/popover'
import { ToastAction } from '@/components/atoms/ui/toast'
import { toast } from '@/components/atoms/ui/use-toast'
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
      const data = row.original
      const status: 'not_started' | 'pending' | 'approved' | 'rejected' | 'canceled' | 'ongoing' | 'completed' =
        row.getValue('status')
      const format = formatInternshipStatus(status)

      async function onSubmitStatus(
        status:
          | 'not_started'
          | 'pending'
          | 'approved'
          | 'interviewing'
          | 'getted_kuota'
          | 'rejected'
          | 'canceled'
          | 'dropoff_completed'
          | 'pickup_completed'
          | 'ongoing'
          | 'ongoing'
          | 'completed'
          | 'sidang_completed'
      ) {
        const body = {
          id: data?.id,
          status: status
        }

        try {
          const response = await api.put(`/internships/${data?.id}`, body)
          if (response?.status == 200) {
            toast({
              title: 'Data berhasil diperbaharui!'
            })
            mutate('/internships')
          } else {
            toast({
              title: 'Data gagal diperbaharui!',
              variant: 'destructive'
            })
          }
        } catch (error) {
          console.error(error)
        }
      }

      const handleUpdate = (
        status:
          | 'not_started'
          | 'pending'
          | 'approved'
          | 'interviewing'
          | 'getted_kuota'
          | 'rejected'
          | 'canceled'
          | 'dropoff_completed'
          | 'pickup_completed'
          | 'ongoing'
          | 'ongoing'
          | 'completed'
          | 'sidang_completed'
      ) => {
        toast({
          variant: 'destructive',
          title: 'Update data',
          description: 'Anda yakin ingin menmperbarui data ini?',
          action: (
            <ToastAction onClick={() => onSubmitStatus(status)} altText="Try again">
              Ya
            </ToastAction>
          )
        })
      }

      return (
        <Popover>
          <PopoverTrigger>
            <div className={cn(format.customCSS, 'p-2 rounded-md text-sm font-medium inline')}>{format.statusShow}</div>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="flex flex-col -m-2 space-y-2 text-sm font-medium">
              <button
                onClick={() => handleUpdate('approved')}
                aria-label="Status Action Approve"
                className="inline px-3 py-1.5 text-white bg-green-500 rounded"
              >
                Setujui
              </button>
              <button
                onClick={() => handleUpdate('rejected')}
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
    cell: ({ row }) => <DataTableRowActions detailAble endpoint="/internships" row={row} />
  }
]
