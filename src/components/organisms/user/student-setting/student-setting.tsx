'use client'

import Link from 'next/link'
import { PiArrowLeftBold } from 'react-icons/pi'

import Container from '@/components/templates/container/container'

import { SettingView } from '../../dashboard/setting/setting-view'

export const SettingOverview = () => {
  return (
    <div className="rounded-3xl pt-7 lg:py-10 relative bg-white overflow-y-auto pb-32 min-h-[70vh]">
      <Container>
        <div className="flex items-center justify-between gap-2 pb-5">
          <Link href="/student" className="flex items-center gap-2">
            <PiArrowLeftBold size={25} />
            <h2 className="text-lg font-semibold text-slate-900">Setting</h2>
          </Link>
        </div>

        <SettingView />
      </Container>
    </div>
  )
}
