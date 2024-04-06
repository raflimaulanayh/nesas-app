'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/atoms/ui/button'

const NotFoundPage = () => {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen bg-white">
      <h1 className="font-extrabold tracking-widest text-slate-800 text-9xl">404</h1>
      <div className="bg-[#4f46e5] px-4 py-2 text-sm rounded text-white rotate-12 absolute">Page Not Found</div>

      <div className="flex items-center gap-4">
        <Button onClick={() => router.back()} className="mt-5 text-white bg-primary">
          Kembali
        </Button>
        <Button
          onClick={() => router.push('mailto:nesas.technology@gmail.com')}
          className="mt-5 text-white bg-white border-2 text-primary hover:text-white border-primary hover:bg-primary hover:border-primary"
        >
          Kontak Kami
        </Button>
      </div>
    </main>
  )
}

export default NotFoundPage
