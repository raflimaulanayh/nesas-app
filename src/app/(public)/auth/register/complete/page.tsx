'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

const CompletePage = () => {
  const user = useCurrentUser()
  if (user?.accountComplete) {
    if (user.role == 'student') {
      redirect('/student')
    } else if (user.role == 'teacher') {
      redirect('/teacher')
    }
  }

  return (
    <SiteLayout>
      <Container className="flex items-center justify-center min-h-screen -mt-20">
        <div className="w-full p-6 space-y-4 text-center bg-white rounded-md shadow sm:max-w-sm">
          <h1 className="text-2xl font-semibold text-primary">Tolong lengkapi data anda!</h1>
          <p className="font-medium text-slate-800">Pilih posisi anda</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/auth/register/complete/student"
              className="px-5 py-2 text-center bg-white border rounded-md hover:border-slate-400 border-slate-300 hover:bg-slate-50"
            >
              <Image src="/static/icons/student.svg" alt="" height={100} width={100} />
              <span className="font-medium">Siswa</span>
            </Link>

            <Link
              href="/auth/register/complete/teacher"
              className="px-5 py-2 text-center bg-white border rounded-md hover:border-slate-400 border-slate-300 hover:bg-slate-50"
            >
              <Image src="/static/icons/teacher.svg" alt="" height={100} width={100} />
              <span className="font-medium">Guru</span>
            </Link>
          </div>
        </div>
      </Container>
    </SiteLayout>
  )
}

export default CompletePage
