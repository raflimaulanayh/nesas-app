import { Trash2Icon } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils'

interface CommentCardProps {
  content: string
  users: {
    id: string
    username: string
    photo: string
  }
  updatedAt?: string
  handleDelete?: () => void
  deleteAble?: boolean
  className?: string
}
export const CommentCard = ({
  content,
  users,
  updatedAt,
  handleDelete,
  deleteAble = false,
  className
}: CommentCardProps) => {
  return (
    <figure className={cn(className, 'flex flex-col bg-slate-200 justify-between gap-1 p-3 rounded-sm ')}>
      <figcaption className="container-markdown">
        <p className="text-slate-700" dangerouslySetInnerHTML={{ __html: content }} />
      </figcaption>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-1">
          <Image
            src={users.photo || '/static/icons/user.svg'}
            alt={'User Picture'}
            height={35}
            width={35}
            className="object-cover rounded-full"
          />
          <div className="flex flex-col text-xs text-slate-800">
            <span>{users.username}</span>
            <span className="text-slate-700">
              {moment(updatedAt ?? '2024-04-09T05:30:48.192Z')
                .startOf('hour')
                .fromNow()}
            </span>{' '}
          </div>
        </div>

        {deleteAble && <Trash2Icon onClick={handleDelete} className="text-red-600 cursor-pointer" size={20} />}
      </div>
    </figure>
  )
}
