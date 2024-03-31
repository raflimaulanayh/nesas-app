import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

const CompletePage = () => {
  return (
    <SiteLayout>
      <Container className="flex items-center justify-center min-h-screen -mt-20">
        <div className="w-full max-w-lg p-6 space-y-4 text-center bg-white rounded-md shadow">
          <h1 className="text-2xl font-semibold text-primary">Tolong lengkapi data anda!</h1>
          <p className="font-medium text-slate-800">Pilih posisi anda</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/auth/register/complete/student"
              className="px-4 py-1 text-center bg-white border rounded-md hover:border-slate-400 border-slate-300 hover:bg-slate-50"
            >
              <Image src="/static/icons/student.svg" alt="" height={50} width={50} />
              <span className="text-sm font-medium">Siswa</span>
            </Link>

            <Link
              href="/auth/register/complete/teacher"
              className="px-4 py-1 text-center bg-white border rounded-md hover:border-slate-400 border-slate-300 hover:bg-slate-50"
            >
              <Image src="/static/icons/teacher.svg" alt="" height={50} width={50} />
              <span className="text-sm font-medium">Guru</span>
            </Link>
          </div>
        </div>
      </Container>
    </SiteLayout>
  )
}

export default CompletePage
