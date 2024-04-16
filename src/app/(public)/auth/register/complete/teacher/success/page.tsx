import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

const TeacherCompleteSuccessPage = () => {
  return (
    <SiteLayout className="Sukses">
      <Container>
        <div className="flex flex-col min-h-screen py-14 lg:py-20">
          <div className="max-w-4xl py-10 sm:mx-auto sm:w-full">
            <div className="flex flex-col items-center px-6 py-10 space-y-6 bg-white border-2 rounded-md shadow-md sm:px-12">
              <h2 className="text-3xl font-medium leading-9 tracking-tight text-center text-primary">
                Selamat, Data Berhasil Dilengkapi!
              </h2>
              <p className="text-lg text-center text-gray-700">
                Terima kasih telah melengkapi data Anda. Kami akan melakukan verifikasi terhadap informasi yang Anda berikan.
              </p>
              <p className="text-lg text-center text-gray-700">
                Tahap verifikasi biasanya memakan waktu kurang lebih 2x24 jam. Setelah verifikasi berhasil, Anda akan dapat
                mengakses menu pengguna, dan agar mempercepat tahap verifikasi anda bisa menghubungi tim NSS melalui email:{' '}
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
                  081320179936
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </SiteLayout>
  )
}

export default TeacherCompleteSuccessPage
