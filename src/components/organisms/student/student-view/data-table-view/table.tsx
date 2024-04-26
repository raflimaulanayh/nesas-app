/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */
'use client'

import useDelete from '@/hooks/use-delete'
import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import Link from 'next/link'
import * as React from 'react'
import useSWR from 'swr'

import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/ui/table'
import { ToastAction } from '@/components/atoms/ui/toast'
import { toast } from '@/components/atoms/ui/use-toast'
import { DataTableFacetedFilter } from '@/components/molecules/data-table/data-table-faceted-filter'
import { DataTablePagination } from '@/components/molecules/data-table/data-table-pagination'
import { DataTableToolbar } from '@/components/molecules/data-table/data-table-toolbar'

import { GENDER_OPTIONS, GRADUATE_STATUS_OPTIONS, OptionProps } from './data-options'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  mutate: any
}

export function DataTableView<TData extends { id: string }, TValue>({
  columns,
  data,
  isLoading = false,
  mutate
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  const CLASSES_OPTIONS: OptionProps[] = []
  const { data: classes, isLoading: loadClasses } = useSWR('/classes')

  if (!loadClasses && classes) {
    classes.data.map((item: { name: string; id: string }) => {
      return CLASSES_OPTIONS.push({ label: item.name, value: item.id })
    })
  }

  console.log(classes)

  const handleDelete = async () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useDelete('/students', rowSelection)
      mutate()
    } catch (error) {
      console.error('Error deleting data:', error)
    }
  }

  const handleModalDelete = () => {
    toast({
      variant: 'destructive',
      title: 'Hapus data',
      description: 'Anda yakin ingin menghapus data ini?',
      action: (
        <ToastAction onClick={handleDelete} altText="Try again">
          Ya
        </ToastAction>
      )
    })
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowId: (row) => row.id
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between w-full gap-2">
        <div className="flex items-center gap-2">
          {Object.keys(rowSelection).length > 0 && (
            <div>
              <Button className="h-9" variant="outline" onClick={handleModalDelete}>
                {Object.keys(rowSelection).length === data.length ? 'Delete All' : 'Delete Selected'}
              </Button>
            </div>
          )}
          <DataTableToolbar
            className="flex flex-wrap items-center"
            filter="name"
            table={table}
            children={
              <div className="flex flex-wrap items-center gap-2">
                {table.getColumn('class_id') && (
                  <DataTableFacetedFilter column={table.getColumn('class_id')} title="Kelas" options={CLASSES_OPTIONS} />
                )}
                {table.getColumn('graduate_status') && (
                  <DataTableFacetedFilter
                    column={table.getColumn('graduate_status')}
                    title="Status sekolah"
                    options={GRADUATE_STATUS_OPTIONS}
                  />
                )}
                {table.getColumn('gender') && (
                  <DataTableFacetedFilter
                    column={table.getColumn('gender')}
                    title="Jenis Kelamin"
                    options={GENDER_OPTIONS}
                  />
                )}
              </div>
            }
          />
        </div>
        <Link href="/dashboard/student/create">
          <Button className="w-full px-3 text-sm font-semibold leading-6 text-center text-white bg-indigo-600 rounded-md shadow-sm h-9 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Tambah siswa
          </Button>
        </Link>
      </div>
      <div className="border rounded-md">
        <Table className="w-[2000px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length - 5} className="h-10">
                  <div className="flex items-center justify-center text-primary">
                    <Loading />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
