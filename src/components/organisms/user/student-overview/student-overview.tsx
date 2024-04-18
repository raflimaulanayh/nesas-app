'use client'

/* eslint-disable import-helpers/order-imports */
import { useCurrentUser } from '@/hooks/use-current-user'
import Link from 'next/link'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { HiAnnotation } from 'react-icons/hi'
import { SiOnlyoffice } from 'react-icons/si'
import { TbSquareChevronRightFilled } from 'react-icons/tb'

import 'react-circular-progressbar/dist/styles.css'
import useSWR from 'swr'
import { Student } from 'types/data/student'

import Container from '@/components/templates/container/container'
import { MdArticle } from 'react-icons/md'

export const StudentOverView = () => {
  const user = useCurrentUser()
  const { data: users } = useSWR(`/users/${user?.id}`)

  let completenessPercentage = 0
  if (users?.data) {
    const { accountComplete, students } = users.data
    let totalDataCount = accountComplete ? 1 : 0
    let completeDataCount = 0

    if (students) {
      totalDataCount += students.length

      completeDataCount = students.filter(
        (student: Student) =>
          student.address &&
          student.birth_date &&
          student.class_id &&
          student.gender &&
          student.graduate_status &&
          student.join_date &&
          student.name &&
          student.nis &&
          student.nisn &&
          student.phone_number &&
          student.phone_number_parent
      ).length
    }

    completenessPercentage = Math.round((completeDataCount / totalDataCount) * 100)
  }

  return (
    <div className="rounded-3xl py-10 relative -mt-20 bg-white h-[70vh]">
      <Container>
        <ul className="grid grid-cols-2 gap-5 -mt-24">
          <li className="col-span-2 p-4 bg-white shadow lg:p-6 rounded-xl">
            <Link href="/student/settings" className="flex items-center justify-between gap-x-4">
              <div className="flex items-center gap-x-3">
                <div className="text-primary h-14 w-14">
                  <CircularProgressbar
                    value={completenessPercentage}
                    text={`${completenessPercentage}%`}
                    strokeWidth={12}
                    styles={buildStyles({
                      textColor: 'rgb(67 56 202 / 1)',
                      textSize: '24px',
                      pathColor: `rgba(67, 56, 202, ${completenessPercentage / 100})`
                    })}
                  />
                </div>
                <div className="flex flex-col">
                  <span>Data Peserta Didik</span>
                  <span className="text-sm font-light">Mohon untuk melengkapi data</span>
                </div>
              </div>
              <TbSquareChevronRightFilled size={24} className="text-primary" />
            </Link>
          </li>
          <li className="col-span-2">
            <Link href="/student/internship" className="flex flex-col p-4 space-y-2 bg-gray-100 shadow lg:p-6 rounded-xl">
              <SiOnlyoffice size={40} className="text-primary" />
              <span className="font-semibold text-slate-800">PKL</span>
            </Link>
          </li>

          <li className="col-span-2 p-4 bg-white border shadow lg:p-6 rounded-xl">
            <Link href="/student/forum" className="flex items-center justify-between gap-x-4">
              <div className="flex items-center gap-x-3">
                <HiAnnotation size={50} className="w-12 h-12 text-primary" />
                <div className="flex flex-col w-9/12">
                  <span>Forum</span>
                  <span className="text-sm font-light">Mari kita diskusi bersama.</span>
                </div>
              </div>
              <TbSquareChevronRightFilled size={24} className="text-primary" />
            </Link>
          </li>

          <li className="col-span-2 p-4 bg-white border shadow lg:p-6 rounded-xl">
            <Link href="/student/article" className="flex items-center justify-between gap-x-4">
              <div className="flex items-center gap-x-3">
                <MdArticle size={50} className="w-12 h-12 text-primary" />
                <div className="flex flex-col w-9/12">
                  <span>Artikel</span>
                  <span className="text-sm font-light">Mari berkreasi, buat cerita Anda jadi nyata!</span>
                </div>
              </div>
              <TbSquareChevronRightFilled size={24} className="text-primary" />
            </Link>
          </li>
        </ul>
      </Container>
    </div>
  )
}
