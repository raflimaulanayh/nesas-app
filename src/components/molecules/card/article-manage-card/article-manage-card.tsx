/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckSquare, EditIcon, EyeIcon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/atoms/ui/button'

import { cn } from '@/lib/utils'
import { formatArticleStatus } from '@/lib/utils/format-article-status'
import { formatDate } from '@/lib/utils/format-date'

export const ArticleManageCard = ({
  loading,
  title,
  updatedAt,
  status,
  picture,
  urlDetail,
  urlEdit,
  handleDelete,
  permission,
  handlePermission
}: any) => {
  return (
    <figure
      className={cn(
        loading && 'opacity-50',
        'relative flex items-center w-full gap-5 p-3 transition-all border rounded-md shadow-sm group hover:shadow-md'
      )}
    >
      {permission && (
        <Button
          size="icon"
          onClick={handlePermission}
          disabled={loading}
          className="absolute text-white right-3 top-3 bg-primary"
        >
          <CheckSquare size={16} />
        </Button>
      )}
      <Image
        src={picture ?? '/static/images/article-dummy.jpg'}
        alt={'Picture' + (title ?? 'Artikel')}
        width={200}
        height={200}
        className="object-cover transition-all rounded-sm w-28 h-28 group-hover:scale-105"
      />
      <figcaption>
        <h3 className="pt-5 font-semibold sm:text-lg line-clamp-2 group-hover:text-primary text-slate-900">{title}</h3>
        <span className="text-sm text-slate-700">{formatDate(updatedAt)}</span>
      </figcaption>
      <span
        className={cn('absolute p-1.5 text-xs font-medium rounded-sm left-3 top-3', formatArticleStatus(status).customCSS)}
      >
        {formatArticleStatus(status).statusShow}
      </span>
      <div className="absolute flex items-center gap-2 right-3 bottom-3">
        <Link aria-label="Button See Detail" href={urlDetail} className="text-primary">
          <EyeIcon size={23} />
        </Link>
        <Link aria-label="Button Edit" href={urlEdit} className="text-primary">
          <EditIcon size={20} />
        </Link>
        <button onClick={handleDelete} aria-label="Button Delete" className="text-red-600">
          <Trash2Icon size={20} />
        </button>
      </div>
    </figure>
  )
}
