import useDelete from '@/hooks/use-delete'
import { Row } from '@tanstack/react-table'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, ReactNode } from 'react'
import { RxDotsHorizontal } from 'react-icons/rx'
import { mutate } from 'swr'

import { Button } from '@/components/atoms/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/atoms/ui/dropdown-menu'
import { ToastAction } from '@/components/atoms/ui/toast'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  endpoint: string
  children?: ReactNode
  editAble?: boolean
  detailAble?: boolean
  deleteAble?: boolean
}

export function DataTableRowActions<TData extends { id: string }>({
  row,
  endpoint,
  children,
  detailAble,
  editAble = true,
  deleteAble = true
}: DataTableRowActionsProps<TData>) {
  const data = row.original
  const router = usePathname()
  const { data: session } = useSession()

  const handleDelete = async () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useDelete(endpoint, { [data.id]: true })

      TrackUserActivity(session?.user?.email ?? '', 'delete', 'Hapus data user : ' + data.id)

      mutate(endpoint)
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

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <RxDotsHorizontal className="w-4 h-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {children && <DropdownMenuItem>{children}</DropdownMenuItem>}
          {detailAble && (
            <DropdownMenuItem>
              <Link className="w-full" href={`${router}/${data.id}`}>
                Detail
              </Link>
            </DropdownMenuItem>
          )}
          {editAble && (
            <DropdownMenuItem>
              <Link className="w-full" href={`${router}/update/${data.id}`}>
                Edit
              </Link>
            </DropdownMenuItem>
          )}
          {deleteAble && <DropdownMenuItem onClick={handleModalDelete}>Delete</DropdownMenuItem>}
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  )
}
