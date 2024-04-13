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
  url: string
}

export const ForumCard = ({ title, content, user, updatedAt, commentCount = 0, url }: ForumCardProps) => {
  return (
    <Link href={url} className="hover:bg-slate-100 group">
      <figure className="flex flex-col justify-between gap-3 py-5 border-b rounded sm:h-52 lg:px-5 border-b-slate-300">
        <figcaption className="space-y-1">
          <h3 className="text-lg font-medium line-clamp-2">{title}</h3>
          <p className="text-sm line-clamp-2 text-slate-700" dangerouslySetInnerHTML={{ __html: content }} />
        </figcaption>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-1">
            <Image
              src={user.picture || '/static/icons/user.svg'}
              alt={'User Picture'}
              height={50}
              width={50}
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
