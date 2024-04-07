import Link from 'next/link'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { HiAnnotation } from 'react-icons/hi'
import { PiExamFill } from 'react-icons/pi'
import { SiOnlyoffice } from 'react-icons/si'
import { TbSquareChevronRightFilled } from 'react-icons/tb'

import 'react-circular-progressbar/dist/styles.css'
import Container from '@/components/templates/container/container'

export const StudentOverView = () => {
  const percentage = 66

  return (
    <div className="rounded-3xl py-10 relative -mt-20 bg-white h-[70vh]">
      <Container>
        <ul className="grid grid-cols-2 gap-5 -mt-24">
          <li className="col-span-2 p-4 bg-white shadow lg:p-6 rounded-xl">
            <Link href="/student/settings" className="flex items-center justify-between gap-x-4">
              <div className="flex items-center gap-x-3">
                <div className="text-primary h-14 w-14">
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    strokeWidth={12}
                    styles={buildStyles({
                      textColor: '#4338ca',
                      textSize: '24px',
                      pathColor: `rgba(67, 56, 202, ${percentage / 100})`
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
          <li>
            <Link href="/student/internship" className="flex flex-col p-4 space-y-2 bg-gray-100 shadow lg:p-6 rounded-xl">
              <SiOnlyoffice size={40} className="text-primary" />
              <span className="font-semibold text-slate-800">PKL</span>
            </Link>
          </li>
          <li>
            <Link href="/student/ujikom" className="flex flex-col p-4 space-y-2 bg-gray-100 shadow lg:p-6 rounded-xl">
              <PiExamFill size={40} className="text-primary" />
              <span className="font-semibold text-slate-800">UjiKom</span>
            </Link>
          </li>

          <li className="col-span-2 p-4 bg-white border shadow lg:p-6 rounded-xl">
            <Link href="/student/forum" className="flex items-center justify-between gap-x-4">
              <div className="flex items-center gap-x-3">
                <HiAnnotation size={50} className="text-primary" />
                <div className="flex flex-col">
                  <span>Forum</span>
                  <span className="text-sm font-light">Mari kita diskusi bersama.</span>
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
