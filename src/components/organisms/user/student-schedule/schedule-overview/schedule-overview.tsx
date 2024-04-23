'use client'

import Link from 'next/link'
import { PiArrowLeftBold } from 'react-icons/pi'

import { LessonSchedulePreview } from '@/components/molecules/excel/lesson-schedule'
import { RoomMapPreview } from '@/components/molecules/excel/room-map'
import Container from '@/components/templates/container/container'

export const ScheduleOverview = () => {
  return (
    <div className="rounded-3xl pt-7 lg:py-10 relative -mt-32 bg-white overflow-y-auto pb-32 min-h-[70vh]">
      <Container>
        <div className="flex items-center justify-between gap-2 pb-5">
          <Link href="/student" className="flex items-center gap-2">
            <PiArrowLeftBold size={25} />
            <h2 className="text-lg font-semibold text-slate-900">Menu Jadwal Pelajaran</h2>
          </Link>
        </div>

        <div className="flex flex-col gap-20">
          <LessonSchedulePreview />
          <RoomMapPreview />
        </div>
      </Container>
    </div>
  )
}
