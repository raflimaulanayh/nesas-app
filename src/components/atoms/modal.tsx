import { Dispatch, SetStateAction } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'

import { cn } from '@/lib/utils'
interface ModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
  title?: string
  className?: string
}

export const Modal = ({ open, setOpen, children, className, title }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn('w-10/12 mx-auto sm:max-w-[425px] rounded', className)} withOutClose>
        {title && (
          <DialogHeader className="text-left">
            <DialogTitle className="mb-3 font-bold text-primary">{title}</DialogTitle>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  )
}
