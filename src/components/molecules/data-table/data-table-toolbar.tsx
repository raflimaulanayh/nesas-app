'use client'

import { Table } from '@tanstack/react-table'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'

import { Button } from '@/components/atoms/ui/button'
import { Input } from '@/components/atoms/ui/input'

import { cn } from '@/lib/utils'

import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filter?: string
  children?: React.ReactNode
  className?: string
}

export function DataTableToolbar<TData>({ table, filter = '', children, className }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="w-auto">
        <Input
          placeholder={`Cari data...`}
          value={(table.getColumn(filter)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(filter)?.setFilterValue(event.target.value)}
          className="text-sm h-9 w-[150px] lg:w-[250px] rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
        />
      </div>
      {children}
      {isFiltered && (
        <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="px-2 mx-2 h-9 lg:px-3">
          Reset
          <RxCross2 className="w-4 h-4 ml-2" />
        </Button>
      )}
      <DataTableViewOptions table={table} />
    </div>
  )
}
