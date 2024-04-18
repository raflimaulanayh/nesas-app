'use client'

import { useSearchParams } from 'next/navigation'

import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

const RegisterSuccessPage = () => {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')
  const role = searchParams.get('role')

  return (
    <SiteLayout className="Sukses">
      <Container>
        <div className="flex flex-col h-full lg:py-20">
          <div className="max-w-4xl py-10 sm:mx-auto sm:w-full">
            <div className="flex flex-col items-center px-6 py-10 space-y-6 bg-white border-2 rounded-md shadow-md sm:px-12">
              <h3 className="text-2xl font-medium leading-9 tracking-tight text-center sm:text-3xl text-primary">
                Selamat {name || ''}, Akun anda berhasil diregistrasi!
              </h3>
              {role === 'teacher' || role === 'officer' ? (
                <div className="space-y-6">
                  <p className="text-lg text-center text-gray-700">
                    Terima kasih telah melakukan registrasi. Kami akan melakukan verifikasi terhadap informasi yang Anda
                    berikan.
                  </p>
                  <p className="text-lg text-center text-gray-700">
                    Tahap verifikasi biasanya memakan waktu maksimal 2x24 jam. Setelah verifikasi berhasil, Anda akan dapat
                    melakukan login dan mengakses menu pengguna, agar mempercepat tahap verifikasi anda bisa menghubungi tim
                    NSS melalui email:{' '}
                    <a
                      className="underline text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="mailto:nesas.technology@gmail.com"
                    >
                      nesas.technology@gmail.com,
                    </a>{' '}
                    atau whatsapp{' '}
                    <a
                      className="underline text-primary"
                      href="https://wa.me/681320179936"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      081320179936.
                    </a>
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-lg text-center text-gray-700">
                    Terima kasih telah melakukan registrasi. Tolong cek email Anda untuk melakukan verifikasi akun.{' '}
                  </p>

                  <p className="text-lg text-center text-gray-700">
                    Jika mengalami masalah atau butuh bantuan, silakan hubungi tim NSS melalui email{' '}
                    <a
                      className="underline text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="mailto:nesas.technology@gmail.com"
                    >
                      nesas.technology@gmail.com
                    </a>{' '}
                    atau melalui WhatsApp{' '}
                    <a
                      className="underline text-primary"
                      href="https://wa.me/681320179936"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      081320179936.
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </SiteLayout>
  )
}

export default RegisterSuccessPage
