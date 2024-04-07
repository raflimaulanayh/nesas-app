import React from 'react'
import { RxCheck } from 'react-icons/rx'

import { cn } from '@/lib/utils'

export const InternshipStatus = () => {
  return (
    <div>
      <ul role="list" className="-mb-8">
        <li>
          <div className="relative pb-8">
            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-400" aria-hidden="true" />
            <div className="relative flex space-x-3">
              <div>
                <span
                  className={cn('bg-green-500', 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white')}
                >
                  <RxCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p className="text-sm text-gray-900">Memilih tempat PKL</p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="relative pb-8">
            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-400" aria-hidden="true" />
            <div className="relative flex space-x-3">
              <div>
                <span
                  className={cn('bg-gray-400', 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white')}
                >
                  <RxCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p className="text-sm text-gray-500">Mendapatkan kuota di tempat PKL</p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="relative pb-8">
            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-400" aria-hidden="true" />
            <div className="relative flex space-x-3">
              <div>
                <span
                  className={cn('bg-gray-400', 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white')}
                >
                  <RxCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p className="text-sm text-gray-500">Dalam proses PKL</p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="relative pb-8">
            <div className="relative flex space-x-3">
              <div>
                <span
                  className={cn('bg-gray-400', 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white')}
                >
                  <RxCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p className="text-sm text-gray-500">PKL Selesai</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
