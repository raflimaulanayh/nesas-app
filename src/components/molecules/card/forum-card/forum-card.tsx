import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { formatTime } from '@/lib/utils/format-time'

interface ForumCardProps {
  title: string
  content: string
  user: {
    username: string
    picture: string
  }
  updatedAt?: string
  commentCount: number
  url?: string
}

export const ForumCard = ({ title, content, user, updatedAt, commentCount = 0, url = '#!' }: ForumCardProps) => {
  return (
    <Link href={url}>
      <figure className="flex flex-col justify-between gap-3 p-5 bg-white border rounded shadow-md hover:bg-slate-100 sm:h-52 border-b-slate-300">
        <figcaption className="space-y-1">
          <h3 className="text-lg font-medium line-clamp-2 text-slate-900">{title}</h3>
          <div className="container-markdown">
            <p className="text-sm line-clamp-2 text-slate-700" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </figcaption>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-1">
            <Image
              src={user.picture || '/static/icons/user.svg'}
              alt={'User Picture'}
              height={40}
              width={40}
              className="object-cover rounded-full"
            />
            <div className="flex flex-col text-sm">
              <span>{user.username}</span>
              <span className="text-xs text-slate-700">{formatTime(updatedAt || '2024-04-09T05:30:48.192Z')}</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-0.5">
              <MessageCircle size={20} />
              <p className="text-sm">{commentCount}</p>
            </span>
          </div>
        </div>
      </figure>
    </Link>
  )
}
